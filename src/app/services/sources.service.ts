import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {INazionale, IProvincia, IRegione} from '../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  private URL_REGIONI = 'https://cdn.jsdelivr.net/gh/pcm-dpc/COVID-19/dati-json/dpc-covid19-ita-regioni.json';
  private URL_PROVINCE = 'https://cdn.jsdelivr.net/gh/pcm-dpc/COVID-19/dati-json/dpc-covid19-ita-province.json';
  private URL_NAZIONALE = 'https://cdn.jsdelivr.net/gh/pcm-dpc/COVID-19/dati-json/dpc-covid19-ita-andamento-nazionale.json';

  private dataRegione: ReplaySubject<Array<IRegione>>;
  private dataProvincia: ReplaySubject<Array<IProvincia>>;
  private dataNazionale: ReplaySubject<Array<INazionale>>;

  constructor(private http: HttpClient) {}

  /* Regioni */

  public loadRegione(): Observable<Array<IRegione>> {
    if (!this.dataRegione) {
      this.dataRegione = new ReplaySubject<Array<IRegione>>(1);
    }

    this.http.get<Array<IRegione>>(this.URL_REGIONI).pipe(
      map(collection =>
        collection.map(item => ({
          ...item,
          data: new Date(item.data)
        }))
      )
    ).subscribe(collection => {
      this.dataRegione.next(collection);
    });

    return this.dataRegione.asObservable();
  }

  public getRegione(): Observable<Array<IRegione>> {
    if (!this.dataRegione) {
      return this.loadRegione();
    }

    return this.dataRegione.asObservable();
  }

  /* Province */

  public loadProvincia(): Observable<Array<IProvincia>> {
    if (!this.dataProvincia) {
      this.dataProvincia = new ReplaySubject<Array<IProvincia>>(1);
    }

    this.http.get<Array<IProvincia>>(this.URL_PROVINCE).pipe(
      map(collection =>
        collection.map(item => ({
          ...item,
          data: new Date(item.data)
        }))
      )
    ).subscribe(collection => {
      this.dataProvincia.next(collection);
    });

    return this.dataProvincia.asObservable();
  }

  public getProvincia(): Observable<Array<IProvincia>> {
    if (!this.dataProvincia) {
      return this.loadProvincia();
    }

    return this.dataProvincia.asObservable();
  }

  /* Nazionale */

  public loadNazionale(): Observable<Array<INazionale>> {
    if (!this.dataNazionale) {
      this.dataNazionale = new ReplaySubject<Array<INazionale>>(1);
    }

    this.http.get<Array<INazionale>>(this.URL_NAZIONALE).pipe(
      map(collection =>
        collection.map(item => ({
          ...item,
          // @ts-ignore
          data: new Date(item.data.replace(/-/g, '/')) // IOS bugfix. Not perfect as it relies on host timezone
        }))
      )
    ).subscribe(collection => {
      this.dataNazionale.next(collection);
    });

    return this.dataNazionale.asObservable();
  }

  public getNazionale(): Observable<Array<INazionale>> {
    if (!this.dataNazionale) {
      return this.loadNazionale();
    }

    return this.dataNazionale.asObservable();
  }

  public getLastNazionale(): Observable<INazionale> {
    return this.getNazionale().pipe(
      map(collection => {
        const lastDate = Math.max(...collection.map(i => i.data.getTime()));
        return collection.find(item => item.data.getTime() === lastDate);
      })
    )
  }

}
