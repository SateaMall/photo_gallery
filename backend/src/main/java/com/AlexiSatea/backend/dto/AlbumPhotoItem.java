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
        String country,
        String city,
        Integer captureYear,
        Instant addedAt,
        Integer width,
        Integer height
) {
    public static AlbumPhotoItem from(AlbumPhoto ap) {
        Photo p = ap.getPhoto();
        return new AlbumPhotoItem(
                p.getId(),
                p.getOwner(),
                p.getTitle(),
                p.getDescription(),
                p.getCountry(),
                p.getCity(),
                p.getCaptureYear(),
                ap.getAddedAt(),
                p.getWidth(),
                p.getHeight()
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
                    photo.getCountry(),
                    photo.getCity(),
                    photo.getCaptureYear(),
                    ap.getAddedAt(),
                            photo.getWidth(),
                            photo.getHeight()
        );
        items.add(item);
        }
        return items;
    }
}