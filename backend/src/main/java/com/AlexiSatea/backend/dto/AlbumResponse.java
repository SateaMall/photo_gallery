package com.AlexiSatea.backend.dto;

import com.AlexiSatea.backend.model.*;
import com.AlexiSatea.backend.repo.AlbumRepository;

import java.util.List;
import java.util.UUID;

public record AlbumResponse(
        UUID id,
        String title,
        AlbumScope scope,
        String description,
        List<AlbumPhotoItem> photos
) {
    public static AlbumResponse from(Album album, List<AlbumPhoto> albumPhotos) {
        return new AlbumResponse(
                album.getId(),
                album.getTitle(),
                album.getScope(),
                album.getDescription(),
                albumPhotos.stream().map(AlbumPhotoItem::from).toList()
        );
    }
}