import {Component, Input, OnInit, } from '@angular/core';
import Chart from 'chart.js';
import {INazionale, IRegione} from '../../models';

@Component({
  selector: 'app-daily-pie-chart',
  templateUrl: './daily-pie-chart.component.html',
  styleUrls: ['./daily-pie-chart.component.scss']
})
export class DailyPieChartComponent {

  @Input()
  private set collection(c: INazionale | IRegione) {
    const data = {
      datasets: [{
        data: [c.nuovi_positivi, c.totale_positivi - c.nuovi_positivi, c.dimessi_guariti, c.deceduti],
        backgroundColor: ['#FAC558', '#EF8157', '#6BD098', '#6C757D']
      }],
      labels: ['Nuovi positivi', 'Positivi già rilevati', 'Guariti', 'Deceduti']
    };

    this.initChart(data);
  }

  public canvas: any;
  public ctx;
  public chartColor;
  public chart;

  initChart(data: any) {
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartPie');
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'pie',
      data,
      options: {
        responsive: true,
        legend: {
          display: false
        }
      }
    });

  }

}
