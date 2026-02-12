package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.MainPhotoResponse;
import com.AlexiSatea.backend.dto.PhotoResponse;
import com.AlexiSatea.backend.model.Enum.AlbumScope;
import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PublicPhotoController {

    final PhotoService photoService;
    final Logger logger = LoggerFactory.getLogger(PublicPhotoController.class);

    @GetMapping("/Photobrowser/mainPhoto/{photoId}")
    public MainPhotoResponse albumMainPhoto(@PathVariable UUID photoId) {
        logger.warn("A WARN Message");
        return photoService.getPhoto(photoId);
    }
    @GetMapping("/homepage/photos/{scope}")
    public Page<PhotoResponse> getPhotos(
            @PathVariable AlbumScope scope,
            @RequestParam(required = false) UUID photoId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        FeatureContext context = (scope == AlbumScope.SHARED)
                ? FeatureContext.SHARED
                : FeatureContext.PERSONAL;

        Owner owner = switch (scope) {
            case SHARED -> null;
            case SATEA -> Owner.SATEA;
            case ALEXIS -> Owner.ALEXIS;
        };

        return photoService.getPhotos(owner, context, photoId, pageable);
    }
}
