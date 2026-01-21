package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumViewResponse;
import com.AlexiSatea.backend.dto.PhotoResponse;
import com.AlexiSatea.backend.model.Enum.AlbumScope;
import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.service.AlbumService;
import com.AlexiSatea.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/homepage")
public class PublicHomepageController {
    private final AlbumService albumService;
    private final PhotoService photoService;
    @GetMapping("/albums/{scope}")
    public List<AlbumViewResponse> getAlbums(@PathVariable AlbumScope scope) {
        return albumService.getAlbums(scope);
    }
    @GetMapping("/photos/{scope}")
    public Page<PhotoResponse> getPhotos(
            @PathVariable AlbumScope scope,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if (scope== AlbumScope.SHARED) {
            return photoService.getPhotos(FeatureContext.SHARED,pageable);
        }
        else {
            Owner owner = scope== AlbumScope.ALEXIS ? Owner.ALEXIS : Owner.SATEA;
        return photoService.getPhotos(owner,  FeatureContext.PERSONAL,pageable);
        }
    }

}
