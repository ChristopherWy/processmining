import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProcessExecution, ProcessExecution } from 'app/shared/model/process-execution.model';
import { ProcessExecutionService } from './process-execution.service';
import { ProcessExecutionComponent } from './process-execution.component';
import { ProcessExecutionDetailComponent } from './process-execution-detail.component';
import { ProcessExecutionUpdateComponent } from './process-execution-update.component';

@Injectable({ providedIn: 'root' })
export class ProcessExecutionResolve implements Resolve<IProcessExecution> {
  constructor(private service: ProcessExecutionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessExecution> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((processExecution: HttpResponse<ProcessExecution>) => {
          if (processExecution.body) {
            return of(processExecution.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProcessExecution());
  }
}

export const processExecutionRoute: Routes = [
  {
    path: '',
    component: ProcessExecutionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'processminingApp.processExecution.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcessExecutionDetailComponent,
    resolve: {
      processExecution: ProcessExecutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'processminingApp.processExecution.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcessExecutionUpdateComponent,
    resolve: {
      processExecution: ProcessExecutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'processminingApp.processExecution.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcessExecutionUpdateComponent,
    resolve: {
      processExecution: ProcessExecutionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'processminingApp.processExecution.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
