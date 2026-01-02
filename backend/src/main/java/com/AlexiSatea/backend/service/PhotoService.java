package com.AlexiSatea.backend.service;


import com.AlexiSatea.backend.model.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.repo.PhotoRepository;
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
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final StorageService storageService;

    // keep it simple for now; you can expand later (HEIC, etc.)
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    @Transactional
    public Photo upload(MultipartFile file, Owner owner, UUID albumId) {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("File is empty");
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported content type: " + contentType);
        }

        UUID id = UUID.randomUUID();

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
                id,
                ext
        );

        try {
            storageService.store(storageKey, file.getInputStream(), file.getSize(), contentType);
        } catch (IOException e) {
            throw new RuntimeException("Failed reading upload stream", e);
        }

        Photo photo = Photo.builder()
                .id(id) // set id ourselves (works even with @GeneratedValue; but better remove @GeneratedValue if you do this)
                .owner(owner)
                .albumId(albumId)
                .storageKey(storageKey)
                .originalFilename(safeName(file.getOriginalFilename()))
                .contentType(contentType)
                .sizeBytes(file.getSize())
                .createdAt(Instant.now())
                .build();

        return photoRepository.save(photo);
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
}
