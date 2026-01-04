package com.AlexiSatea.backend.repo;


import com.AlexiSatea.backend.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AlbumRepository extends JpaRepository<Album, UUID> {}
