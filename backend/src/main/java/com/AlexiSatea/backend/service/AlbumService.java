package com.AlexiSatea.backend.service;

import com.AlexiSatea.backend.dto.AlbumPhotoItem;
import com.AlexiSatea.backend.dto.AlbumResponse;
import com.AlexiSatea.backend.model.*;
import com.AlexiSatea.backend.model.Enum.AlbumScope;
import com.AlexiSatea.backend.repo.AlbumPhotoRepository;
import com.AlexiSatea.backend.repo.AlbumRepository;
import com.AlexiSatea.backend.repo.PhotoRepository;
import com.AlexiSatea.backend.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final PhotoRepository photoRepository;
    private final AlbumRepository albumRepository;
    private final AlbumPhotoRepository albumPhotoRepository;
    private final StorageService storageService;

    @Transactional
    public AlbumResponse  createAlbum(String title, AlbumScope scope, String description) {
        // Check
        if (title == null || title.isBlank()) throw new IllegalArgumentException("Title is required");
        if (scope == null) throw new IllegalArgumentException("Scope is required");
        // Build the album instance
        Album album = Album.builder()
                .title(title)
                .scope(scope)
                .description(description)
                .build();
        album = albumRepository.save(album);
        return AlbumResponse.from(album,List.of());
    }

    @Transactional
    public void addPhotoToAlbum (UUID photoID,UUID albumID,int position){
        Album album = albumRepository.findById(albumID).orElseThrow(() -> new IllegalArgumentException("Album not found: " + albumID));
        Photo photo = photoRepository.findById(photoID) .orElseThrow(() -> new IllegalArgumentException("Photo not found: " + photoID));
        if (albumPhotoRepository.existsByAlbum_IdAndPhoto_Id(albumID, photoID)) {
            throw new IllegalArgumentException("Photo already in album");
        }
        if (position < 0) {
            position = albumPhotoRepository.findNextPosition(albumID);
        }
        //TODO Reorder the whole album when we chose the position of a photo
        AlbumPhoto relation= AlbumPhoto.builder()
                .photo(photo)
                .album(album)
                .position(position)
                .addedAt(Instant.now())
                .build();
        albumPhotoRepository.save(relation);
    }

    @Transactional
    public AlbumResponse  updateAlbum(UUID id, String title, AlbumScope scope, String description) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Album not found: " + id));

        if (title != null && !title.isBlank()) album.setTitle(title.trim());
        if (scope != null) album.setScope(scope);
        album.setDescription(description);

        albumRepository.save(album);
        return new AlbumResponse(
                album.getId(),
                album.getTitle(),
                album.getScope(),
                album.getDescription(),
                AlbumPhotoItem.from(album.getPhotoLinks())
        );
    }

    @Transactional
    public void deleteAlbum(UUID id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Album not found: " + id));
        albumRepository.delete(album);
    }

    @Transactional
    public void removePhotoFromAlbum(UUID albumId, UUID photoId) {
        AlbumPhotoId id = new AlbumPhotoId(albumId, photoId);

        if (!albumPhotoRepository.existsById(id)) {
            throw new IllegalArgumentException("Photo is not in this album");
        }
        //TODO Work on the order of other photos in the album after delete
        albumPhotoRepository.deleteById(id);

    }
    @Transactional(readOnly = true)
    public AlbumResponse getAlbum(UUID albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Album not found"));
        List<AlbumPhoto> relations  = albumPhotoRepository.findByAlbumIdWithPhoto(albumId);
        return AlbumResponse.from(album,relations);
    }
}
