package com.AlexiSatea.backend.repo;


import com.AlexiSatea.backend.model.Album;
import com.AlexiSatea.backend.model.Interface.AlbumViewRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AlbumRepository extends JpaRepository<Album, UUID> {


    @Query(value = """
    select distinct on (ap.album_id)
        a.id as albumId,
        a.title as title,
        a.description as description,
        ap.photo_id as firstPhotoId,
        count(*) over (partition by ap.album_id) as numberOfPhotos
    from albums a
    left join album_photos ap on ap.album_id = a.id
    order by
        ap.album_id,
        ap.position asc nulls last,
        ap.added_at asc
    """, nativeQuery = true)
    List<AlbumViewRow> findAlbumViews();






}


