package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumViewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/homepage")
public class PublicHomepageController {
    @GetMapping("/albums")
    public List<AlbumViewResponse> getAlbums() {
        return albumService.getAlbums();
    }
    @PostMapping("/photos")
    public List<Photo>

}
