import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcessExecution } from 'app/shared/model/process-execution.model';

type EntityResponseType = HttpResponse<IProcessExecution>;
type EntityArrayResponseType = HttpResponse<IProcessExecution[]>;

@Injectable({ providedIn: 'root' })
export class ProcessExecutionService {
  public resourceUrl = SERVER_API_URL + 'api/process-executions';

  constructor(protected http: HttpClient) {}

  create(processExecution: IProcessExecution): Observable<EntityResponseType> {
    return this.http.post<IProcessExecution>(this.resourceUrl, processExecution, { observe: 'response' });
  }

  update(processExecution: IProcessExecution): Observable<EntityResponseType> {
    return this.http.put<IProcessExecution>(this.resourceUrl, processExecution, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcessExecution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessExecution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
