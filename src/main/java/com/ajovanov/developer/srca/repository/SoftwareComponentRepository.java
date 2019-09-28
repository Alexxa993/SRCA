package com.ajovanov.developer.srca.repository;

import com.ajovanov.developer.srca.model.SoftwareComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Storage for software components.
 */
@Repository
public interface SoftwareComponentRepository extends
        JpaRepository<SoftwareComponent, Long> {
    SoftwareComponent findByComponentId(String componentId);
}
