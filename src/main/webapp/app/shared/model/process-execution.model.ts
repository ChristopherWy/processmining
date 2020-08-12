import { IProcess } from 'app/shared/model/process.model';

export interface IProcessExecution {
  id?: number;
  execution?: string;
  name?: IProcess;
}

export class ProcessExecution implements IProcessExecution {
  constructor(public id?: number, public execution?: string, public name?: IProcess) {}
}
