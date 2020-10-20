import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 1 }
      ],
      borderColor: 'blue',
      backgroundColor: 'blue',
      pointBorderColor: 'blue',
      pointBackgroundColor: 'blue',
      label: 'EMail Erstkontakt',
      pointRadius: 10,
    },
    {
      data: [
        { x: 1, y: 2 }
      ],
      borderColor: 'blue',
      backgroundColor: 'blue',
      pointBorderColor: 'blue',
      pointBackgroundColor: 'blue',
      label: 'Telefon Erstontakt',
      pointRadius: 10,
    },
    {
      data: [
        { x: 2, y: 1.5 }
      ],
      borderColor: 'green',
      backgroundColor: 'green',
      pointBorderColor: 'green',
      pointBackgroundColor: 'green',
      label: 'Beratungstermin',
      pointRadius: 10,
    },
    {
      data: [
        { x: 3, y: 1 }
      ],
      borderColor: 'red',
      backgroundColor: 'red',
      pointBorderColor: 'red',
      pointBackgroundColor: 'red',
      label: 'Verkauf',
      pointRadius: 10,
    },
    {
      data: [
        { x: 3, y: 2}
      ],
      borderColor: 'red',
      backgroundColor: 'red',
      pointBorderColor: 'red',
      pointBackgroundColor: 'red',
      label: 'Kein Verkauf',
      pointRadius: 10,
    },
    {
      data: [
        { x: 4, y: 1.5}
      ],
      borderColor: 'black',
      backgroundColor: 'black',
      pointBorderColor: 'black',
      pointBackgroundColor: 'black',
      label: 'Retour',
      pointRadius: 10,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
