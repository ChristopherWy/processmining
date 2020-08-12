import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProcessminingTestModule } from '../../../test.module';
import { ProcessExecutionUpdateComponent } from 'app/entities/process-execution/process-execution-update.component';
import { ProcessExecutionService } from 'app/entities/process-execution/process-execution.service';
import { ProcessExecution } from 'app/shared/model/process-execution.model';

describe('Component Tests', () => {
  describe('ProcessExecution Management Update Component', () => {
    let comp: ProcessExecutionUpdateComponent;
    let fixture: ComponentFixture<ProcessExecutionUpdateComponent>;
    let service: ProcessExecutionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProcessminingTestModule],
        declarations: [ProcessExecutionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProcessExecutionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessExecutionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessExecutionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessExecution(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessExecution();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
