export interface IRegione {
  data: Date;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  lat: number;
  long: number;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_attualmente_positivi: number;
  nuovi_attualmente_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
}

export interface IProvincia {
  data: Date;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  codice_provincia: number;
  denominazione_provincia: string;
  sigla_provincia: string;
  lat: number;
  long: number;
  totale_casi: number;
}

export interface INazionale {
  data: Date;
  stato: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_attualmente_positivi: number;
  nuovi_attualmente_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
}
