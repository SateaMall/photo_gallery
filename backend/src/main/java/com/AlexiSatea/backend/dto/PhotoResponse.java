package com.AlexiSatea.backend.dto;


import com.AlexiSatea.backend.model.AlbumPhoto;
import com.AlexiSatea.backend.model.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.model.Theme;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
// Template of the photo that is sent !
public record PhotoResponse(
         UUID id,
        Owner owner,
        String contentType,
        long sizeBytes,
        Instant createdAt,
        List<Theme> themes,
        List<UUID> albumIds,
        String fileUrl
) {
    public static PhotoResponse from(Photo p, List<UUID> albumIds) {
        return new PhotoResponse(
                p.getId(),
                p.getOwner(),
                p.getContentType(),
                p.getSizeBytes(),
                p.getCreatedAt(),
                p.getThemes(),
                albumIds,
                "/api/photos/" + p.getId() + "/file"
        );
    }
}
