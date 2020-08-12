package de.processmining.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ProcessExecution.
 */
@Entity
@Table(name = "process_execution")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProcessExecution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "process_name", nullable = false)
    private String processName;

    @NotNull
    @Column(name = "execution", nullable = false)
    private String execution;

    @ManyToOne
    @JsonIgnoreProperties(value = "processExecutions", allowSetters = true)
    private Process processName;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessName() {
        return processName;
    }

    public ProcessExecution processName(String processName) {
        this.processName = processName;
        return this;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getExecution() {
        return execution;
    }

    public ProcessExecution execution(String execution) {
        this.execution = execution;
        return this;
    }

    public void setExecution(String execution) {
        this.execution = execution;
    }

    public Process getProcessName() {
        return processName;
    }

    public ProcessExecution processName(Process process) {
        this.processName = process;
        return this;
    }

    public void setProcessName(Process process) {
        this.processName = process;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProcessExecution)) {
            return false;
        }
        return id != null && id.equals(((ProcessExecution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProcessExecution{" +
            "id=" + getId() +
            ", processName='" + getProcessName() + "'" +
            ", execution='" + getExecution() + "'" +
            "}";
    }
}
