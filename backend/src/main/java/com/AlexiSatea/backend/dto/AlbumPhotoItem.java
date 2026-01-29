package com.AlexiSatea.backend.dto;

import com.AlexiSatea.backend.model.*;
import com.AlexiSatea.backend.model.Enum.Owner;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public record AlbumPhotoItem(
        UUID photoId,
        Owner owner,
        String title,
        String description,
        Instant addedAt
) {
    public static AlbumPhotoItem from(AlbumPhoto ap) {
        Photo p = ap.getPhoto();
        return new AlbumPhotoItem(
                p.getId(),
                p.getOwner(),
                p.getTitle(),
                p.getDescription(),
                ap.getAddedAt()
        );
    }
    public static List<AlbumPhotoItem> from(List<AlbumPhoto> relations) {
        List<AlbumPhotoItem> items = new ArrayList<>();
        for (AlbumPhoto ap : relations) {
            Photo photo = ap.getPhoto();
            AlbumPhotoItem item=
                    new AlbumPhotoItem(
                    photo.getId(),
                    photo.getOwner(),
                    photo.getTitle(),
                    photo.getDescription(),
                    ap.getAddedAt()
        );
        items.add(item);
        }
        return items;
    }
}