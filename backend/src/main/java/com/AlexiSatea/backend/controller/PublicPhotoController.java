package com.AlexiSatea.backend.controller;


import com.AlexiSatea.backend.dto.PhotoResponse;
import com.AlexiSatea.backend.model.Owner;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photos")
public class PublicPhotoController {

    private final PhotoService photoService;

    @GetMapping
    public Page<PhotoResponse> list(@RequestParam Owner owner, Pageable pageable) {
        return photoService.listByOwner(owner, pageable).map(PhotoResponse::from);
    }

    @GetMapping("/{id}")
    public PhotoResponse get(@PathVariable UUID id) {
        Photo p = photoService.get(id);
        return PhotoResponse.from(p);
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<Resource> file(@PathVariable UUID id) {
        Photo p = photoService.get(id);
        Resource resource = photoService.loadFile(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(p.getContentType()))
                .cacheControl(CacheControl.maxAge(7, java.util.concurrent.TimeUnit.DAYS).cachePublic())
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + p.getOriginalFilename() + "\"")
                .body(resource);
    }
}
