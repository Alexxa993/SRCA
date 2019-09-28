package com.ajovanov.developer.srca.web;

import com.ajovanov.developer.srca.dto.ComponentsPage;
import com.ajovanov.developer.srca.dto.SoftwareComponentRestDto;
import com.ajovanov.developer.srca.dto.SoftwarePhaseRestDto;
import com.ajovanov.developer.srca.model.SoftwareComponent;
import com.ajovanov.developer.srca.model.SoftwarePhase;
import com.ajovanov.developer.srca.repository.SoftwareComponentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/srca")
class SoftwareComponentController {

    private final Logger log = LoggerFactory.getLogger(SoftwareComponentController.class);
    private SoftwareComponentRepository repository;

    public SoftwareComponentController(SoftwareComponentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/components")
    ComponentsPage components() {
        String loggedUser = getLoggedInUser();
        return ComponentsPage
                .builder()
                .components(repository.findAll())
                .loggedInUser(loggedUser)
                .build();
    }

    @GetMapping("/component/{id}")
    ResponseEntity<?> getComponent(@PathVariable Long id) {
        Optional<SoftwareComponent> cmp = repository.findById(id);
        return cmp.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/component")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<SoftwareComponent> createGroup(@Valid @RequestBody SoftwareComponentRestDto component) throws URISyntaxException {
        log.info("Request to create new component: {}", component);
        SoftwareComponent dbModel = mapDtoToModel(component);
        SoftwareComponent result = repository.save(dbModel);
        return ResponseEntity.created(new URI("/srca/component/" + result.getId()))
                .body(result);
    }

    private SoftwareComponent mapDtoToModel(SoftwareComponentRestDto dto) {
        return SoftwareComponent.builder()
                .componentId(dto.getComponentId())
                .description(dto.getDescription())
                .emails(dto.getEmails())
                .phases(mapPhasesDtoToModel(dto.getPhases()))
                .build();
    }

    private Set<SoftwarePhase> mapPhasesDtoToModel(Set<SoftwarePhaseRestDto> dtos) {
        return dtos.stream().map(dto -> {
            DateTimeFormatter df = DateTimeFormatter.ofPattern("MM/dd/yyyy");
            final LocalDate from = LocalDate.parse(dto.getDateFrom(), df);
            final LocalDate to = LocalDate.parse(dto.getDateTo(), df);

            if (from.isBefore(LocalDate.now())) {
                throw new ValidationException("Start dates cannot be in past");
            }

            if (to.isBefore(from)) {
                throw new ValidationException("End dates cannot be before start dates");
            }

            return SoftwarePhase.builder()
                    .dateFrom(from)
                    .dateTo(to)
                    .name(dto.getName())
                    .requirements(dto.getRequirements())
                    .build();
        }).collect(Collectors.toSet());
    }

    private String getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = "";
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return username;
    }
}
