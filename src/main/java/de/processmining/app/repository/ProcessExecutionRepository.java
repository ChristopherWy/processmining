package de.processmining.app.repository;

import de.processmining.app.domain.ProcessExecution;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProcessExecution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessExecutionRepository extends JpaRepository<ProcessExecution, Long> {
}
