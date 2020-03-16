import { Component, OnInit } from '@angular/core';
import {INazionale, IRegione} from '../../models';
import {SourcesService} from '../../services/sources.service';


@Component({
  selector: 'app-dashboard',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public lastNazionale: INazionale;
  public nazionale: Array<INazionale>;
  public lastRegioni: Array<IRegione>;
  public regioni: Array<IRegione>

  constructor(private sourcesService: SourcesService) {}

  ngOnInit(): void {
    this.sourcesService.getLastNazionale().subscribe(lastNazionale => this.lastNazionale = lastNazionale);
    this.sourcesService.getNazionale().subscribe(nazionale => this.nazionale = nazionale);
    this.sourcesService.getLastRegioni().subscribe(lastRegioni => this.lastRegioni = lastRegioni);
    this.sourcesService.getRegioni().subscribe(regioni => this.regioni = regioni);
  }

  formatDate(date: Date) {
    const pad2 = (n) => ('00' + n).slice(-2);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  }



}
