package com.ajovanov.developer.srca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Software Phase DTO.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SoftwarePhaseRestDto {
    private String name;
    private String dateFrom;
    private String dateTo;
    private String requirements;
}
