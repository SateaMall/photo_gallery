package com.AlexiSatea.backend.dto;

import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Enum.Theme;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.model.PhotoFeature;

import java.time.Instant;
import java.util.ArrayList;
import java.util.UUID;

public record SinglePhotoResponse(
            UUID id,
            Owner owner,
            Instant createdAt,
            String title,
            String description,
            String country,
            String city,
            Integer captureYear,
            ArrayList<Theme> themes

    ) {
        //For single photo (photo's page)
        public static SinglePhotoResponse from(Photo p) {
            return new SinglePhotoResponse(
                    p.getId(),
                    p.getOwner(),
                    p.getCreatedAt(),
                    p.getTitle(),
                    p.getDescription(),
                    p.getCountry(),
                    p.getCity(),
                    p.getCaptureYear(),
                    new ArrayList<Theme>()  //TODO (populate the themes)
                    );
        }


}
