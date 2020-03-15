import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TinyCardComponent} from './components/tiny-card/tiny-card.component';
import {TimeChartComponent} from './components/time-chart/time-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TinyCardComponent,
    TimeChartComponent
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
