package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumViewResponse;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.service.AlbumService;
import com.AlexiSatea.backend.service.PhotoService;
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
    private final AlbumService albumService;
    private final PhotoService photoService;
    @GetMapping("/albums")
    public List<AlbumViewResponse> getAlbums() {
        return albumService.getAlbums();
    }
    /*@PostMapping("/photos")
    public List<Photo>
*/
}
