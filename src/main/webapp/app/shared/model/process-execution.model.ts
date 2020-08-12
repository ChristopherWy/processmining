import { IProcess } from 'app/shared/model/process.model';

export interface IProcessExecution {
  id?: number;
  processName?: string;
  execution?: string;
  processName?: IProcess;
}

export class ProcessExecution implements IProcessExecution {
  constructor(public id?: number, public processName?: string, public execution?: string, public processName?: IProcess) {}
}
