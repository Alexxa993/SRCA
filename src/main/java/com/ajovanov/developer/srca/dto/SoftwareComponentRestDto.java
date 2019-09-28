package com.ajovanov.developer.srca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * Software Component DTO.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoftwareComponentRestDto {
    private String componentId;
    private String description;
    private String emails;
    private Set<SoftwarePhaseRestDto> phases;
}
