package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumResponse;
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
@RequestMapping("/api/albums")
public class PublicAlbumController {
    private final AlbumService albumService;

    @GetMapping("/{id}")
    public AlbumResponse getAlbum(@PathVariable UUID id) {
        return albumService.getAlbum(id);
    }

    @GetMapping
    public List<AlbumResponse> getAlbums() {
        return albumService.getAlbums();
    }
}
