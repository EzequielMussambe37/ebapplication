export interface GInterface {}

export interface DialogData {
  userName: string | undefined;
  passWord: string | undefined;
}

export interface DataToSaveOnFireStore {
  items: string;
  name: string;
  value: number;
  details: string;
  date: any;
  time: any;
}

export interface PeriodicDataFireStore {
  producto: string;
  valore: number;
  date: any;
  time: any;
}

export interface updateRecord {
  date: string;
  details: string;
  id: string;
  items: string;
  name: string;
  time: string;
  value: string;
}
