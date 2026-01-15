package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumViewResponse;
import com.AlexiSatea.backend.dto.PhotoResponse;
import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.service.AlbumService;
import com.AlexiSatea.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/homepage")
public class PublicHomepageController {
    private final AlbumService albumService;
    private final PhotoService photoService;
    @GetMapping("/albums")
    public List<AlbumViewResponse> getAlbums() {
        return albumService.getAlbums();
    }
    @GetMapping("/photos/{context}/{owner}")
    public List<PhotoResponse> getPhotos(@PathVariable FeatureContext context, @PathVariable Owner owner) {
        return photoService.getPhotos(owner,  context);
    }

}
