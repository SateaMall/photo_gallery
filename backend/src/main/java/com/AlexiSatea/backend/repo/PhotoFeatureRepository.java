package com.AlexiSatea.backend.repo;

import com.AlexiSatea.backend.model.Enum.FeatureContext;
import com.AlexiSatea.backend.model.Enum.Owner;
import com.AlexiSatea.backend.model.PhotoFeature;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PhotoFeatureRepository extends JpaRepository<PhotoFeature, UUID> {

    Optional<PhotoFeature> findByPhoto_IdAndContext(UUID photoId, FeatureContext context);

    // SHARED section: any owner allowed
    @Query("""
        select pf
        from PhotoFeature pf
        join fetch pf.photo p
        where pf.owner = :context
          and pf.enabled = true
        order by
          case when pf.orderIndex is null then 1 else 0 end,
          pf.orderIndex asc,
          pf.featuredAt desc,
          p.createdAt desc
    """)
    List<PhotoFeature> findFeaturedShared(FeatureContext context, Pageable pageable);

    // PERSONAL section: filter by owner of the photo
    @Query("""
        select pf
        from PhotoFeature pf
        join fetch pf.photo p
        where pf.context = :context
          and pf.enabled = true
          and p.owner = :owner
        order by
          case when pf.orderIndex is null then 1 else 0 end,
          pf.orderIndex asc,
          pf.featuredAt desc,
          p.createdAt desc
    """)
    List<PhotoFeature> findFeaturedPersonal(FeatureContext context, Owner owner, Pageable pageable);



    @Query("""
    select pf
    from PhotoFeature pf
    join fetch pf.photo p
    where pf.context = :context
      and pf.enabled = true
      and (:owner is null or p.owner = :owner)
    order by
      case when pf.orderIndex is null then 1 else 0 end,
      pf.orderIndex asc,
      pf.featuredAt desc,
      p.createdAt desc
""")
    List<PhotoFeature> findFeatured(
            FeatureContext context,
            Owner owner,
            Pageable pageable
    );
}
//TODO finish the Repository here (correct it) and create a service !    and then test!