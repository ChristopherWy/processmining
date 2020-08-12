import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProcessminingTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ProcessExecutionDeleteDialogComponent } from 'app/entities/process-execution/process-execution-delete-dialog.component';
import { ProcessExecutionService } from 'app/entities/process-execution/process-execution.service';

describe('Component Tests', () => {
  describe('ProcessExecution Management Delete Component', () => {
    let comp: ProcessExecutionDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessExecutionDeleteDialogComponent>;
    let service: ProcessExecutionService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProcessminingTestModule],
        declarations: [ProcessExecutionDeleteDialogComponent],
      })
        .overrideTemplate(ProcessExecutionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessExecutionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessExecutionService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
