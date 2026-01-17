package com.AlexiSatea.backend.dto;


import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.model.Enum.Theme;
import com.AlexiSatea.backend.model.PhotoFeature;
import jakarta.persistence.Column;

import java.time.Instant;
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
        String title,
        String description,
        Integer index
) {
    public static PhotoResponse from(Photo p) {
        return  from(p,null);
    }
    public static PhotoResponse from(Photo p, PhotoFeature pf) {
        return new PhotoResponse(
                p.getId(),
                p.getOwner(),
                p.getContentType(),
                p.getSizeBytes(),
                p.getCreatedAt(),
                p.getThemes(),
                p.getTitle(),
                p.getDescription(),
                pf != null ?pf.getOrderIndex() : null
        );
    }
}
