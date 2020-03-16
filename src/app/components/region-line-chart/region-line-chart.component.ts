import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {INazionale, IRegione} from '../../models';

@Component({
  selector: 'app-region-line-chart',
  templateUrl: './region-line-chart.component.html',
  styleUrls: ['./region-line-chart.component.scss']
})
export class RegionLineChartComponent {

  public colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a',
    '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#ccc', 'green'];
  public regions: Array<{codice_regione: number, denominazione_regione: string}> = [];

  @Input()
  private set collection(c: Array<IRegione>) {
    this.regions = [];

    const regionObj = {};
    for (const entry of c) {
      if (!regionObj[entry.codice_regione]) {
        regionObj[entry.codice_regione] = []
      }

      regionObj[entry.codice_regione].push(entry);

      // ----

      if (this.regions.filter(reg => reg.codice_regione === entry.codice_regione).length < 1) {
        this.regions.push({
          codice_regione: entry.codice_regione,
          denominazione_regione: entry.denominazione_regione
        });
      }
    }

    const region = <Array<Array<IRegione>>>Object.keys(regionObj).map(key => regionObj[key]);

    const dataset = region.map(days =>
      this.makeRegionDataset(
        this.colors[days[0].codice_regione],
        days.map(day => day.totale_casi)
      )
    );

    const labels = region[0].map(day => `${day.data.getDate()}/${day.data.getMonth() + 1}`);

    this.initChart(labels, dataset);
  }

  public canvas: any;
  public ctx;
  public chartColor;
  public chart;

  private makeRegionDataset(color, data) {
    return {
      borderColor: color,
      backgroundColor: color,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      data
    };
  }

  initChart(labels: Array<string>, datasets: Array<any>) {
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartRegion');
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
