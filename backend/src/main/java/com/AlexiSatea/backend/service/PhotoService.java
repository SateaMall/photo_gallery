package com.AlexiSatea.backend.service;


import com.AlexiSatea.backend.model.*;
import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Enum.Theme;
import com.AlexiSatea.backend.repo.AlbumRepository;
import com.AlexiSatea.backend.repo.PhotoFeatureRepository;
import com.AlexiSatea.backend.repo.PhotoRepository;
import com.AlexiSatea.backend.repo.AlbumPhotoRepository;
import com.AlexiSatea.backend.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final AlbumPhotoRepository albumPhotoRepository;
    private final StorageService storageService;
    private final PhotoFeatureRepository photoFeatureRepository;

    // We can expand later (HEIC, etc.)
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );


    /**********************************         Photo APIs         ******************************/
    @Transactional
    public Photo upload(MultipartFile file, Owner owner, UUID albumId, List<Theme> themes) {
        // Check if the file is valid
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("File is empty");
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported content type: " + contentType);
        }

        //Create the Photo ID
        UUID photoID = UUID.randomUUID();

        String ext = switch (contentType) {
            case "image/jpeg" -> "jpg";
            case "image/png" -> "png";
            case "image/webp" -> "webp";
            default -> "bin";
        };

        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        String storageKey = String.format("owner/%s/%04d/%02d/%s.%s",
                owner.name(),
                now.getYear(),
                now.getMonthValue(),
                photoID,
                ext
        );

        // Store the file
        try {
            storageService.store(storageKey, file.getInputStream(), file.getSize(), contentType);
        } catch (IOException e) {
            throw new RuntimeException("Failed reading upload stream", e);
        }

        // Build the photo instance
        Photo photo = Photo.builder()
                .id(photoID) // set id ourselves (works even with @GeneratedValue; but better remove @GeneratedValue if you do this)
                .owner(owner)
                .themes( themes == null ? List.of() : themes)
                .storageKey(storageKey)
                .originalFilename(safeName(file.getOriginalFilename()))
                .contentType(contentType)
                .sizeBytes(file.getSize())
                .createdAt(Instant.now())
                .build();
        photo = photoRepository.save(photo);
        if (albumId != null) {
            Album album = albumRepository.findById(albumId)
                    .orElseThrow(() -> new IllegalArgumentException("Album not found: " + albumId));
            if (albumPhotoRepository.existsByAlbum_IdAndPhoto_Id(albumId, photoID)) {
                throw new IllegalArgumentException("Photo already in album");
            }
            int position = albumPhotoRepository.findNextPosition(albumId);

            AlbumPhoto relation= AlbumPhoto.builder()
                    .photo(photo)
                    .album(album)
                    .position(position)
                    .addedAt(Instant.now())
                    .build();
            albumPhotoRepository.save(relation);
        }

        return photo;
    }



    @Transactional(readOnly = true)
    public Page<Photo> listByOwner(Owner owner, Pageable pageable) {
        return photoRepository.findByOwnerOrderByCreatedAtDesc(owner, pageable);
    }

    @Transactional(readOnly = true)
    public Photo get(UUID id) {
        return photoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found: " + id));
    }

    @Transactional(readOnly = true)
    public Resource loadFile(UUID id) {
        Photo photo = get(id);
        return storageService.loadAsResource(photo.getStorageKey());
    }

    @Transactional
    public void delete(UUID id) {
        Photo photo = get(id);
        storageService.delete(photo.getStorageKey());
        photoRepository.delete(photo);
    }



    private String safeName(String name) {
        if (name == null) return "unknown";
        // remove path parts, keep it simple
        return name.replace("\\", "/").substring(name.lastIndexOf('/') + 1);
    }

    /**********************************         Album-Photo APIs         ******************************/
    public List<UUID> albumIdsOfPhoto( Photo photo) {
        return albumPhotoRepository.findAlbumIdsByPhotoId(photo.getId());
    }

    public Map<UUID, List<UUID>> albumIdsByPhotoIds(List<UUID> photoIds) {
        if (photoIds == null || photoIds.isEmpty()) return Map.of();
        var rows = albumPhotoRepository.findAlbumIdsByPhotoIds(photoIds);
        // group albumIds by photoId
        return rows.stream()
                .collect(Collectors.groupingBy(
                        AlbumPhotoRepository.PhotoAlbumIdRow::getPhotoId,
                        Collectors.mapping(
                                AlbumPhotoRepository.PhotoAlbumIdRow::getAlbumId,
                                Collectors.collectingAndThen(Collectors.toList(), list -> list.stream().distinct().toList())
                        )
                ));
    }



    /**********************************         PhotoFeature APIs         ******************************/
    @Transactional
    public Integer AddUpdatePhotoFeature(UUID photoId, Integer index, FeatureContext context, Boolean enabled) {
        if (index != null && index < 0) {
            throw new IllegalArgumentException("index must be >= 0");
        }

        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found: " + photoId));

        PhotoFeature pf = photoFeatureRepository
                .findByPhotoIdAndContext(photoId, context)
                .orElseGet(() -> PhotoFeature.builder()
                        .photo(photo)
                        .context(context)
                        .build()
                );

        // if enabled param not sent => default true
        pf.setEnabled(enabled == null ? true : enabled);

        // if index param not sent => keep null or set null if you want to "clear" ordering
        pf.setOrderIndex(index);

        // update timestamp when (re)featured or modified
        pf.setFeaturedAt(Instant.now());

        photoFeatureRepository.save(pf);

        return pf.getOrderIndex();
    }

    public void deletePhotoFeature(UUID photoId, FeatureContext context) {
        PhotoFeature pf = photoFeatureRepository.findByPhotoIdAndContext(photoId, context)
                .orElseThrow(() -> new IllegalArgumentException(
                        "PhotoFeature not found for photoId=" + photoId + ", context=" + context
                ));
        photoFeatureRepository.delete(pf);
    }
}



