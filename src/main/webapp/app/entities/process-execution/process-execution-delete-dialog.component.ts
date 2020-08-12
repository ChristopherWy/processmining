import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcessExecution } from 'app/shared/model/process-execution.model';
import { ProcessExecutionService } from './process-execution.service';

@Component({
  templateUrl: './process-execution-delete-dialog.component.html',
})
export class ProcessExecutionDeleteDialogComponent {
  processExecution?: IProcessExecution;

  constructor(
    protected processExecutionService: ProcessExecutionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.processExecutionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('processExecutionListModification');
      this.activeModal.close();
    });
  }
}
