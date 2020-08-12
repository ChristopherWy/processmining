import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'process',
        loadChildren: () => import('./process/process.module').then(m => m.ProcessminingProcessModule),
      },
      {
        path: 'process-execution',
        loadChildren: () => import('./process-execution/process-execution.module').then(m => m.ProcessminingProcessExecutionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ProcessminingEntityModule {}
