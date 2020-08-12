import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProcessminingTestModule } from '../../../test.module';
import { ProcessExecutionDetailComponent } from 'app/entities/process-execution/process-execution-detail.component';
import { ProcessExecution } from 'app/shared/model/process-execution.model';

describe('Component Tests', () => {
  describe('ProcessExecution Management Detail Component', () => {
    let comp: ProcessExecutionDetailComponent;
    let fixture: ComponentFixture<ProcessExecutionDetailComponent>;
    const route = ({ data: of({ processExecution: new ProcessExecution(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProcessminingTestModule],
        declarations: [ProcessExecutionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProcessExecutionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessExecutionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load processExecution on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processExecution).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
