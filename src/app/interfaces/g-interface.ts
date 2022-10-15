export interface GInterface {}

export interface DialogData {
  userName: string | undefined;
  passWord: string | undefined;
}

export interface DataToSaveOnFireStore {
  items: string;
  name: string;
  value: number;
  text: string;
  date: any;
  time: any;
}

export interface PeriodicDataFireStore {
  id: number;
  nome: string;
  producto: string;
  valore: number;
  date: any;
}
