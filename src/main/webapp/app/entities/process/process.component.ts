import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {IProcess, Process} from 'app/shared/model/process.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProcessService } from './process.service';
import { ProcessDeleteDialogComponent } from './process-delete-dialog.component';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {ProcessUpdateComponent} from "./process-update.component";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'jhi-process',
  templateUrl: './process.component.html',
})
export class ProcessComponent implements OnInit, OnDestroy {
  processes?: IProcess[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  processUpdate: ProcessUpdateComponent = new ProcessUpdateComponent(this.processService, this.activatedRoute, new FormBuilder());

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [];
  public scatterChartType: ChartType = 'scatter';

  constructor(
    protected processService: ProcessService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.processService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IProcess[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInProcesses();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProcess): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProcesses(): void {
    this.eventSubscriber = this.eventManager.subscribe('processListModification', () => this.loadPage());
  }

  delete(process: IProcess): void {
    const modalRef = this.modalService.open(ProcessDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.process = process;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IProcess[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/process'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.processes = data || [];
    this.setScatterChartData(this.processes);
    this.ngbPaginationPage = this.page;
  }

  setScatterChartData(data: Process[]): void {
    this.scatterChartData = [];
    for(let i = 0; i < data.length; i++) {
      const process = data[i];
      this.addScatterChartData(process);
    }
  }

  addScatterChartData(process: any): void {
    const nr = this.scatterChartData.length;
    const data = {
      data: [
        { x: process.level, y: nr }
      ],
      borderColor: 'blue',
      backgroundColor: 'blue',
      pointBorderColor: 'blue',
      pointBackgroundColor: 'blue',
      label: process.step,
      pointRadius: 10,
    };
    this.scatterChartData[nr] = data;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
