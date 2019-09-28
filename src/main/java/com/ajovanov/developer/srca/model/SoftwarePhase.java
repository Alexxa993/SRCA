package com.ajovanov.developer.srca.model;

import lombok.*;

import javax.persistence.*;

import lombok.NonNull;
import java.time.LocalDate;

/**
 * Software Phase DB Model.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "s_phase")
@Table(name = "s_phase")
public class SoftwarePhase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cmp_id")
    private Long cmpId;

    @NonNull
    private String name;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private String requirements;
}
