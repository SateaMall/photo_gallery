package com.AlexiSatea.backend.model;
import com.AlexiSatea.backend.model.Enum.FeatureContext;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(
        name = "photo_feature",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"photo_id", "context"})
        },
        indexes = {
                @Index(name = "idx_photo_feature_context_enabled", columnList = "context, enabled"),
                @Index(name = "idx_photo_feature_context_order", columnList = "context, orderIndex")
        }
)
public class PhotoFeature {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "photo_id", nullable = false)
    private Photo photo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private FeatureContext context;

    @Column(nullable = false)
    private boolean enabled = true;

    @Column
    private Integer orderIndex; // nullable = auto order

    @Column(name = "featured_at", nullable = false)
    private Instant featuredAt = Instant.now();


    @PrePersist
    void onCreate() {
        if (featuredAt == null) featuredAt = Instant.now();
    }
}