package de.processmining.app.web.rest;

import de.processmining.app.ProcessminingApp;
import de.processmining.app.domain.ProcessExecution;
import de.processmining.app.repository.ProcessExecutionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProcessExecutionResource} REST controller.
 */
@SpringBootTest(classes = ProcessminingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProcessExecutionResourceIT {

    private static final String DEFAULT_PROCESS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EXECUTION = "AAAAAAAAAA";
    private static final String UPDATED_EXECUTION = "BBBBBBBBBB";

    @Autowired
    private ProcessExecutionRepository processExecutionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProcessExecutionMockMvc;

    private ProcessExecution processExecution;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessExecution createEntity(EntityManager em) {
        ProcessExecution processExecution = new ProcessExecution()
            .processName(DEFAULT_PROCESS_NAME)
            .execution(DEFAULT_EXECUTION);
        return processExecution;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessExecution createUpdatedEntity(EntityManager em) {
        ProcessExecution processExecution = new ProcessExecution()
            .processName(UPDATED_PROCESS_NAME)
            .execution(UPDATED_EXECUTION);
        return processExecution;
    }

    @BeforeEach
    public void initTest() {
        processExecution = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcessExecution() throws Exception {
        int databaseSizeBeforeCreate = processExecutionRepository.findAll().size();
        // Create the ProcessExecution
        restProcessExecutionMockMvc.perform(post("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(processExecution)))
            .andExpect(status().isCreated());

        // Validate the ProcessExecution in the database
        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeCreate + 1);
        ProcessExecution testProcessExecution = processExecutionList.get(processExecutionList.size() - 1);
        assertThat(testProcessExecution.getProcessName()).isEqualTo(DEFAULT_PROCESS_NAME);
        assertThat(testProcessExecution.getExecution()).isEqualTo(DEFAULT_EXECUTION);
    }

    @Test
    @Transactional
    public void createProcessExecutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = processExecutionRepository.findAll().size();

        // Create the ProcessExecution with an existing ID
        processExecution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcessExecutionMockMvc.perform(post("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(processExecution)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessExecution in the database
        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkProcessNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = processExecutionRepository.findAll().size();
        // set the field null
        processExecution.setProcessName(null);

        // Create the ProcessExecution, which fails.


        restProcessExecutionMockMvc.perform(post("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(processExecution)))
            .andExpect(status().isBadRequest());

        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExecutionIsRequired() throws Exception {
        int databaseSizeBeforeTest = processExecutionRepository.findAll().size();
        // set the field null
        processExecution.setExecution(null);

        // Create the ProcessExecution, which fails.


        restProcessExecutionMockMvc.perform(post("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(processExecution)))
            .andExpect(status().isBadRequest());

        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProcessExecutions() throws Exception {
        // Initialize the database
        processExecutionRepository.saveAndFlush(processExecution);

        // Get all the processExecutionList
        restProcessExecutionMockMvc.perform(get("/api/process-executions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(processExecution.getId().intValue())))
            .andExpect(jsonPath("$.[*].processName").value(hasItem(DEFAULT_PROCESS_NAME)))
            .andExpect(jsonPath("$.[*].execution").value(hasItem(DEFAULT_EXECUTION)));
    }
    
    @Test
    @Transactional
    public void getProcessExecution() throws Exception {
        // Initialize the database
        processExecutionRepository.saveAndFlush(processExecution);

        // Get the processExecution
        restProcessExecutionMockMvc.perform(get("/api/process-executions/{id}", processExecution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(processExecution.getId().intValue()))
            .andExpect(jsonPath("$.processName").value(DEFAULT_PROCESS_NAME))
            .andExpect(jsonPath("$.execution").value(DEFAULT_EXECUTION));
    }
    @Test
    @Transactional
    public void getNonExistingProcessExecution() throws Exception {
        // Get the processExecution
        restProcessExecutionMockMvc.perform(get("/api/process-executions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcessExecution() throws Exception {
        // Initialize the database
        processExecutionRepository.saveAndFlush(processExecution);

        int databaseSizeBeforeUpdate = processExecutionRepository.findAll().size();

        // Update the processExecution
        ProcessExecution updatedProcessExecution = processExecutionRepository.findById(processExecution.getId()).get();
        // Disconnect from session so that the updates on updatedProcessExecution are not directly saved in db
        em.detach(updatedProcessExecution);
        updatedProcessExecution
            .processName(UPDATED_PROCESS_NAME)
            .execution(UPDATED_EXECUTION);

        restProcessExecutionMockMvc.perform(put("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcessExecution)))
            .andExpect(status().isOk());

        // Validate the ProcessExecution in the database
        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeUpdate);
        ProcessExecution testProcessExecution = processExecutionList.get(processExecutionList.size() - 1);
        assertThat(testProcessExecution.getProcessName()).isEqualTo(UPDATED_PROCESS_NAME);
        assertThat(testProcessExecution.getExecution()).isEqualTo(UPDATED_EXECUTION);
    }

    @Test
    @Transactional
    public void updateNonExistingProcessExecution() throws Exception {
        int databaseSizeBeforeUpdate = processExecutionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcessExecutionMockMvc.perform(put("/api/process-executions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(processExecution)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessExecution in the database
        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcessExecution() throws Exception {
        // Initialize the database
        processExecutionRepository.saveAndFlush(processExecution);

        int databaseSizeBeforeDelete = processExecutionRepository.findAll().size();

        // Delete the processExecution
        restProcessExecutionMockMvc.perform(delete("/api/process-executions/{id}", processExecution.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProcessExecution> processExecutionList = processExecutionRepository.findAll();
        assertThat(processExecutionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
