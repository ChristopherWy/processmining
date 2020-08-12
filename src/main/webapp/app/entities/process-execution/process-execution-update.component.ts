import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProcessExecution, ProcessExecution } from 'app/shared/model/process-execution.model';
import { ProcessExecutionService } from './process-execution.service';
import { IProcess } from 'app/shared/model/process.model';
import { ProcessService } from 'app/entities/process/process.service';

@Component({
  selector: 'jhi-process-execution-update',
  templateUrl: './process-execution-update.component.html',
})
export class ProcessExecutionUpdateComponent implements OnInit {
  isSaving = false;
  processes: IProcess[] = [];

  editForm = this.fb.group({
    id: [],
    execution: [null, [Validators.required]],
    name: [],
  });

  constructor(
    protected processExecutionService: ProcessExecutionService,
    protected processService: ProcessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processExecution }) => {
      this.updateForm(processExecution);

      this.processService.query().subscribe((res: HttpResponse<IProcess[]>) => (this.processes = res.body || []));
    });
  }

  updateForm(processExecution: IProcessExecution): void {
    this.editForm.patchValue({
      id: processExecution.id,
      execution: processExecution.execution,
      name: processExecution.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const processExecution = this.createFromForm();
    if (processExecution.id !== undefined) {
      this.subscribeToSaveResponse(this.processExecutionService.update(processExecution));
    } else {
      this.subscribeToSaveResponse(this.processExecutionService.create(processExecution));
    }
  }

  private createFromForm(): IProcessExecution {
    return {
      ...new ProcessExecution(),
      id: this.editForm.get(['id'])!.value,
      execution: this.editForm.get(['execution'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcessExecution>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProcess): any {
    return item.id;
  }
}
