import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProcess, Process } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';

@Component({
  selector: 'jhi-process-update',
  templateUrl: './process-update.component.html',
})
export class ProcessUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    step: [null, [Validators.required]],
    level: [null, [Validators.required]],
  });

  constructor(protected processService: ProcessService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ process }) => {
      this.updateForm(process);
    });
  }

  updateForm(process: IProcess): void {
    this.editForm.patchValue({
      id: process.id,
      name: process.name,
      step: process.step,
      level: process.level,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const process = this.createFromForm();
    if (process.id !== undefined) {
      this.subscribeToSaveResponse(this.processService.update(process));
    } else {
      this.subscribeToSaveResponse(this.processService.create(process));
    }
  }

  private createFromForm(): IProcess {
    return {
      ...new Process(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      step: this.editForm.get(['step'])!.value,
      level: this.editForm.get(['level'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcess>>): void {
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
}
