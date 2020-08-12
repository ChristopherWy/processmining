import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessExecution } from 'app/shared/model/process-execution.model';

@Component({
  selector: 'jhi-process-execution-detail',
  templateUrl: './process-execution-detail.component.html',
})
export class ProcessExecutionDetailComponent implements OnInit {
  processExecution: IProcessExecution | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processExecution }) => (this.processExecution = processExecution));
  }

  previousState(): void {
    window.history.back();
  }
}
