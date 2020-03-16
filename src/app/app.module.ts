import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TinyCardComponent} from './components/tiny-card/tiny-card.component';
import {TimeChartComponent} from './components/time-chart/time-chart.component';
import { DailyPieChartComponent } from './components/daily-pie-chart/daily-pie-chart.component';
import { RegionLineChartComponent } from './components/region-line-chart/region-line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TinyCardComponent,
    TimeChartComponent,
    DailyPieChartComponent,
    RegionLineChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
