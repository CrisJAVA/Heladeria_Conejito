package com.heladeria.backend.repository;

import com.heladeria.backend.model.SeccionLanding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeccionLandingRepository extends JpaRepository<SeccionLanding, Long> {
    Optional<SeccionLanding> findBySectionKey(String sectionKey);
    boolean existsBySectionKey(String sectionKey);
}
