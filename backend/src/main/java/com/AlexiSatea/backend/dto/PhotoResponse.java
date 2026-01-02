package com.AlexiSatea.backend.dto;


import com.AlexiSatea.backend.model.Owner;
import com.AlexiSatea.backend.model.Photo;

import java.time.Instant;
import java.util.UUID;

public record PhotoResponse(
        UUID id,
        Owner owner,
        UUID albumId,
        String contentType,
        long sizeBytes,
        Instant createdAt,
        String fileUrl
) {
    public static PhotoResponse from(Photo p) {
        return new PhotoResponse(
                p.getId(),
                p.getOwner(),
                p.getAlbumId(),
                p.getContentType(),
                p.getSizeBytes(),
                p.getCreatedAt(),
                "/api/photos/" + p.getId() + "/file"
        );
    }
}
