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
// ID is created later
    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Owner owner;

    // ---- Original (as uploaded) ----

    /**
     * Path/key to original file (as uploaded).
     * Example: owner/Satea/2026/01/<uuid>_org.jpg
     */
    @Column(nullable = false, unique = true, length = 500)
    private String originalKey;

    @Column(nullable = false, length = 255)
    private String originalFilename;

    /**
     * MIME type, e.g. image/jpeg, image/png
     */
    @Column(nullable = false, length = 100)
    private String originalContentType;

    @Column(nullable = false)
    private long originalSizeBytes;


    // ---- Derivatives ----

    /**
     * Medium quality variant (homepage / normal viewing)
     * Example: owner/Satea/2026/01/<uuid>_md.jpg
     */
    @Column(nullable = false, length = 500)
    private String mediumKey;

    @Column(nullable = false, length = 100)
    private String mediumContentType; // usually image/jpeg or image/webp

    @Column(nullable = false)
    private long mediumSizeBytes;

    /**
     * Thumbnail / low quality (grids / side strip)
     * Example: owner/Satea/2026/01/<uuid>_th.jpg
     */
    @Column(nullable = false, length = 500)
    private String thumbKey;

    @Column(nullable = false, length = 100)
    private String thumbContentType;

    @Column(nullable = false)
    private long thumbSizeBytes;


    // ---- Display metadata ----

    @Column(nullable = false, length = 150)
    private String title;



    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Integer width;   // original width

    @Column(nullable = false)
    private Integer height;  // original height

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

    @Column(nullable = true, length = 255)
    private String description;

    //ToDo add country & city or just location??



    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
    }


}
