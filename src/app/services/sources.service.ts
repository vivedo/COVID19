import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {INazionale, IProvincia, IRegione} from '../models';
import {map, tap} from 'rxjs/operators';
import {collectExternalReferences} from '@angular/compiler';

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

      // Merge PA Bolzano & PA Trento in Trentino
      map(collection => {
        const paTrentino = collection.filter(reg => reg.codice_regione === 4);
        collection = collection.filter(reg => reg.codice_regione !== 4);
        const daySplit = {};

        for (const pa of paTrentino) {
          // @ts-ignore
          if (!daySplit[pa.data]) {
            // @ts-ignore
            daySplit[pa.data] = [];
          }

          // @ts-ignore
          daySplit[pa.data].push(pa);
        }

        const tColl = [];

        // tslint:disable-next-line:forin
        for (const day in daySplit) {
          const pas = daySplit[day];
          const trentino: IRegione = pas[0];

          for (const prop in pas[1]) {
            if (!isNaN(trentino[prop]) && !['lat', 'long', 'data', 'codice_regione'].includes(prop)) {
              trentino[prop] += pas[1][prop];
            }
          }

          trentino.denominazione_regione = 'Trentino Alto Adige';
          tColl.push(trentino);
        }

        collection.push(...tColl);

        return collection;
      }),

      // Formats date object
      map(collection =>
        collection.map(item => ({
          ...item,
          // @ts-ignore
          data: new Date(item.data.replace(/-/g, '/')) // IOS bugfix. Not perfect as it relies on host timezone
        }))
      ),

      // Order dataset
      map(collection => collection.sort((a, b) => a.codice_regione - b.codice_regione)),
      map(collection => collection.sort((a, b) => a.data.getTime() - b.data.getTime()))
    ).subscribe(collection => {
      this.dataRegione.next(collection);
    });

    return this.dataRegione.asObservable();
  }

  public getRegioni(): Observable<Array<IRegione>> {
    if (!this.dataRegione) {
      return this.loadRegione();
    }

    return this.dataRegione.asObservable();
  }

  public getLastRegioni(): Observable<Array<IRegione>> {
    return this.getRegioni().pipe(
      map(collection => {
        const lastDate = Math.max(...collection.map(i => i.data.getTime()));
        return collection.filter(item => item.data.getTime() === lastDate);
      })
    )
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
