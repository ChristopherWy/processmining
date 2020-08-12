export interface IProcess {
  id?: number;
  name?: string;
  code?: string;
}

export class Process implements IProcess {
  constructor(public id?: number, public name?: string, public code?: string) {}
}
