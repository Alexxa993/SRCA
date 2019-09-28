package com.ajovanov.developer.srca.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

/**
 * Software Component DB Model.
 */
@Data
@Entity(name = "s_component")
@Table(name = "s_component")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SoftwareComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String componentId;
    private String description;
    private String emails;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name="cmp_id")
    private Set<SoftwarePhase> phases;

}

