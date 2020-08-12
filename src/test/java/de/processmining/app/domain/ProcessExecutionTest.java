package de.processmining.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.processmining.app.web.rest.TestUtil;

public class ProcessExecutionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcessExecution.class);
        ProcessExecution processExecution1 = new ProcessExecution();
        processExecution1.setId(1L);
        ProcessExecution processExecution2 = new ProcessExecution();
        processExecution2.setId(processExecution1.getId());
        assertThat(processExecution1).isEqualTo(processExecution2);
        processExecution2.setId(2L);
        assertThat(processExecution1).isNotEqualTo(processExecution2);
        processExecution1.setId(null);
        assertThat(processExecution1).isNotEqualTo(processExecution2);
    }
}
