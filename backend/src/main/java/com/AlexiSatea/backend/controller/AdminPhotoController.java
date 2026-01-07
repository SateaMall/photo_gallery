package com.AlexiSatea.backend.controller;

import com.AlexiSatea.backend.dto.PhotoResponse;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.model.Enum.Theme;
import com.AlexiSatea.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/photos")
public class AdminPhotoController {

    private final PhotoService photoService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoResponse upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam Owner owner,
            @RequestParam(required = false) UUID albumId,
            @RequestParam(required = false) List<Theme> themes
    ) {
        Photo photo = photoService.upload(file, owner, albumId,themes);
        List<UUID> albumIds = photoService.albumIdsOfPhoto(photo);
        return PhotoResponse.from(photo, albumIds);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        photoService.delete(id);
    }
}
