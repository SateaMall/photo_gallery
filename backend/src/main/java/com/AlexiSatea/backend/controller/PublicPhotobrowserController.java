package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.AlbumPhotoItem;
import com.AlexiSatea.backend.dto.AlbumResponse;
import com.AlexiSatea.backend.model.AlbumPhoto;
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
@RequestMapping("api/Photobrowser")
public class PublicPhotobrowserController {
    public final AlbumService albumService;


@GetMapping("/albumDetails/{albumId}")
    public AlbumResponse albumDetails(@PathVariable UUID albumId) {
        return albumService.getAlbumDetails(albumId);
}

    @GetMapping("/albumItems/{albumId}")
    public List<AlbumPhotoItem> albumItemsList (@PathVariable UUID albumId) {
        return albumService.getAlbumItems(albumId);
    }
}
