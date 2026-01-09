package com.AlexiSatea.backend.dto;

import java.util.UUID;

public record AlbumViewResponse (
        UUID AlbumId,
        UUID FirstPhotoId,
        String title,
        String description,
        int numberOfPhotos
)
{
    public static AlbumViewResponse from (UUID AlbumID, UUID FirstPhotoID, String title, String description, int numberOfPhotos){
        return new AlbumViewResponse(AlbumID, FirstPhotoID, title, description, numberOfPhotos);
    }
}
//TODO Continue the homepage view of albums