import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProcessminingSharedModule } from 'app/shared/shared.module';
import { ProcessExecutionComponent } from './process-execution.component';
import { ProcessExecutionDetailComponent } from './process-execution-detail.component';
import { ProcessExecutionUpdateComponent } from './process-execution-update.component';
import { ProcessExecutionDeleteDialogComponent } from './process-execution-delete-dialog.component';
import { processExecutionRoute } from './process-execution.route';

@NgModule({
  imports: [ProcessminingSharedModule, RouterModule.forChild(processExecutionRoute)],
  declarations: [
    ProcessExecutionComponent,
    ProcessExecutionDetailComponent,
    ProcessExecutionUpdateComponent,
    ProcessExecutionDeleteDialogComponent,
  ],
  entryComponents: [ProcessExecutionDeleteDialogComponent],
})
export class ProcessminingProcessExecutionModule {}
