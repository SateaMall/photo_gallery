package com.AlexiSatea.backend.dto;

import com.AlexiSatea.backend.model.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record AlbumResponse(
        UUID id,
        String title,
        AlbumScope scope,
        String description,
        List<AlbumPhotoItem> photos
) {
    public static AlbumResponse from(Album album, List<AlbumPhoto> links) {
        return new AlbumResponse(
                album.getId(),
                album.getTitle(),
                album.getScope(),
                album.getDescription(),
                links.stream().map(AlbumPhotoItem::from).toList()
        );
    }
}