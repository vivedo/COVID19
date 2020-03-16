import {Component, Input, OnInit, } from '@angular/core';
import Chart from 'chart.js';
import {INazionale, IRegione} from '../../models';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss']
})
export class TimeChartComponent {

  @Input()
  private set collection(c: Array<INazionale | IRegione>) {
    c.sort((a, b) => a.data.getTime() - b.data.getTime());

    const labels = c.map(i => `${i.data.getDate()}/${i.data.getMonth() + 1}`);

    const datasets = [
      {
        borderColor: '#EF8157',
        backgroundColor: '#EF8157',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: c.map(i => i.totale_attualmente_positivi)
      },
      {
        borderColor: '#6BD098',
        backgroundColor: '#6BD098',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: c.map(i => i.dimessi_guariti)
      },
      {
        borderColor: '#6C757D',
        backgroundColor: '#6C757D',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: c.map(i => i.deceduti)
      },
    ];

    this.initChart(labels, datasets);
  }

  public canvas: any;
  public ctx;
  public chartColor;
  public chart;

  initChart(labels: Array<string>, datasets: Array<any>) {
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartTime');
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels,
        datasets
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              drawBorder: false,
              zeroLineColor: 'transparent',
              color: 'rgba(0,0,0,0.05)'
            }
          }],
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0.05)',
              zeroLineColor: 'transparent'
            },
          }]
        },
      }
    });

  }

}
