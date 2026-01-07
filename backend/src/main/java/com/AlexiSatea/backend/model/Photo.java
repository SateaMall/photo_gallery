package com.AlexiSatea.backend.model;

import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Enum.Theme;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
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
//Id is created later
    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Owner owner;

    @Column(nullable = false, unique = true, length = 500)
    private String storageKey; // e.g. owner/Satea/2026/01/<uuid>.jpg

    @Column(nullable = false, length = 255)
    private String originalFilename;

    @Column(nullable = false, length = 100)
    private String contentType; // e.g. Jpeg, JPG ..

    @Column(nullable = false)
    private long sizeBytes;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Builder.Default
    @OneToMany(mappedBy = "photo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlbumPhoto> albumLinks = new ArrayList<>();


    @Builder.Default
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "photo_themes",
            joinColumns = @JoinColumn(name = "photo_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"photo_id", "theme"})
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "theme", nullable = false, length = 50)
    private List<Theme> themes = new ArrayList<>();

    //To add country & city?



    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
    }


}
