package com.AlexiSatea.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@Entity
@Table(name = "photos", indexes = {
        @Index(name = "idx_photos_owner", columnList = "owner"),
        @Index(name = "idx_photos_createdAt", columnList = "createdAt")
})
public class Photo {

    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Owner owner;

    // optional: later you can create Album entity and use @ManyToOne
    private UUID albumId;

    @Column(nullable = false, unique = true, length = 500)
    private String storageKey; // e.g. owner/ME/2026/01/<uuid>.jpg

    @Column(nullable = false, length = 255)
    private String originalFilename;

    @Column(nullable = false, length = 100)
    private String contentType;

    @Column(nullable = false)
    private long sizeBytes;

    @Column(nullable = false)
    private Instant createdAt;
}
