package com.AlexiSatea.backend.dto;

import com.AlexiSatea.backend.model.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public record AlbumPhotoItem(
        UUID photoId,
        Owner owner,
        String fileUrl,
        int position,
        Instant addedAt
) {
    public static AlbumPhotoItem from(AlbumPhoto ap) {
        Photo p = ap.getPhoto();
        return new AlbumPhotoItem(
                p.getId(),
                p.getOwner(),
                "/api/photos/" + p.getId() + "/file",
                ap.getPosition(),
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
                "/api/photos/" + photo.getId() + "/file",
                    ap.getPosition(),
                    ap.getAddedAt()
        );
        items.add(item);
        }
        return items;
    }
}