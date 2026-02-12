package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumPhotoItem;
import com.AlexiSatea.backend.dto.AlbumResponse;
import com.AlexiSatea.backend.dto.AlbumViewResponse;
import com.AlexiSatea.backend.model.Enum.AlbumScope;
import com.AlexiSatea.backend.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PublicAlbumController {
    private final AlbumService albumService;

    @GetMapping("/Photobrowser/albumDetails/{albumId}")
    public AlbumViewResponse albumDetails(@PathVariable UUID albumId) {
        return albumService.getAlbumDetails(albumId);
    }

    @GetMapping("/Photobrowser/albumItems/{albumId}")
    public List<AlbumPhotoItem> albumItemsList (@PathVariable UUID albumId) {
        return albumService.getAlbumItems(albumId);
    }

    @GetMapping("/homepage/albums/{scope}")
    public List<AlbumViewResponse> getAlbums(@PathVariable AlbumScope scope) {
        return albumService.getAlbums(scope);
    }

}
