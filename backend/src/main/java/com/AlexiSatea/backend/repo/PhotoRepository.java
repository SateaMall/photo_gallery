package com.AlexiSatea.backend.repo;

import com.AlexiSatea.backend.model.Owner;
import com.AlexiSatea.backend.model.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    Page<Photo> findByOwnerOrderByCreatedAtDesc(Owner owner, Pageable pageable);
}