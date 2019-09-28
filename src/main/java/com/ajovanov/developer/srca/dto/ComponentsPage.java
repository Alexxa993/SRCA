package com.ajovanov.developer.srca.dto;

import com.ajovanov.developer.srca.model.SoftwareComponent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

/**
 * Covenants Page DTO.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComponentsPage {
    private Collection<SoftwareComponent> components;
    private String loggedInUser;
}
