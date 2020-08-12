package de.processmining.app.web.rest;

import de.processmining.app.domain.ProcessExecution;
import de.processmining.app.repository.ProcessExecutionRepository;
import de.processmining.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.processmining.app.domain.ProcessExecution}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProcessExecutionResource {

    private final Logger log = LoggerFactory.getLogger(ProcessExecutionResource.class);

    private static final String ENTITY_NAME = "processExecution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcessExecutionRepository processExecutionRepository;

    public ProcessExecutionResource(ProcessExecutionRepository processExecutionRepository) {
        this.processExecutionRepository = processExecutionRepository;
    }

    /**
     * {@code POST  /process-executions} : Create a new processExecution.
     *
     * @param processExecution the processExecution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new processExecution, or with status {@code 400 (Bad Request)} if the processExecution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/process-executions")
    public ResponseEntity<ProcessExecution> createProcessExecution(@Valid @RequestBody ProcessExecution processExecution) throws URISyntaxException {
        log.debug("REST request to save ProcessExecution : {}", processExecution);
        if (processExecution.getId() != null) {
            throw new BadRequestAlertException("A new processExecution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProcessExecution result = processExecutionRepository.save(processExecution);
        return ResponseEntity.created(new URI("/api/process-executions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /process-executions} : Updates an existing processExecution.
     *
     * @param processExecution the processExecution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated processExecution,
     * or with status {@code 400 (Bad Request)} if the processExecution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the processExecution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/process-executions")
    public ResponseEntity<ProcessExecution> updateProcessExecution(@Valid @RequestBody ProcessExecution processExecution) throws URISyntaxException {
        log.debug("REST request to update ProcessExecution : {}", processExecution);
        if (processExecution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProcessExecution result = processExecutionRepository.save(processExecution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, processExecution.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /process-executions} : get all the processExecutions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of processExecutions in body.
     */
    @GetMapping("/process-executions")
    public ResponseEntity<List<ProcessExecution>> getAllProcessExecutions(Pageable pageable) {
        log.debug("REST request to get a page of ProcessExecutions");
        Page<ProcessExecution> page = processExecutionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /process-executions/:id} : get the "id" processExecution.
     *
     * @param id the id of the processExecution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the processExecution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/process-executions/{id}")
    public ResponseEntity<ProcessExecution> getProcessExecution(@PathVariable Long id) {
        log.debug("REST request to get ProcessExecution : {}", id);
        Optional<ProcessExecution> processExecution = processExecutionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(processExecution);
    }

    /**
     * {@code DELETE  /process-executions/:id} : delete the "id" processExecution.
     *
     * @param id the id of the processExecution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/process-executions/{id}")
    public ResponseEntity<Void> deleteProcessExecution(@PathVariable Long id) {
        log.debug("REST request to delete ProcessExecution : {}", id);
        processExecutionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
