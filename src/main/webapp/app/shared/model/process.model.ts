export interface IProcess {
  id?: number;
  name?: string;
  step?: string;
  level?: number;
}

export class Process implements IProcess {
  constructor(public id?: number, public name?: string, public step?: string, public level?: number) {}
}
