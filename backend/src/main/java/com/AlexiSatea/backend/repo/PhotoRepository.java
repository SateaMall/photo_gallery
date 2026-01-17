package com.AlexiSatea.backend.repo;

import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.Interface.PhotoAndFeature;
import com.AlexiSatea.backend.model.Photo;
import com.AlexiSatea.backend.model.PhotoFeature;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    Page<Photo> findByOwnerOrderByCreatedAtDesc(Owner owner, Pageable pageable);

    @EntityGraph(attributePaths = {"themes"})
    @Query("""
    select p as photo, pf as photoFeature
    from Photo p
    left join PhotoFeature pf
        on pf.photo = p
       and pf.context = :context
       and pf.enabled = true
    where (:owner is null or p.owner = :owner)
    order by
      case when pf.id is null then 1 else 0 end,
      pf.orderIndex asc nulls last,
      pf.featuredAt desc,
      p.createdAt desc
""")
    List<PhotoAndFeature> findFeatured(
            @Param("context") FeatureContext context,
            @Param("owner") @Nullable Owner owner
    );

}

