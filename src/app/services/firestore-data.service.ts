import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, retry } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  constructor(private http: HttpClient, private dados: AngularFirestore) {}
  dataFromFireStore: any;

  functionObject: any = [
    {
      more: (fireValue: number, value: number) => {
        return fireValue > value;
      },
      less: (fireValue: number, value: number) => {
        return fireValue < value;
      },
      equal: (fireValue: number, value: number) => {
        return fireValue === value;
      },
    },
  ];
  getUserName() {
    return this.dados.collection('/users').snapshotChanges().pipe(retry(3));
  }

  addDataToFireStore(data: any) {
    try {
      this.dados.collection('/budget').add(data);
      alert('Addicionado com sucesso');
    } catch {
      alert('Something went wrong');
    }
  }

  filterDataFromFireStore(
    filterName: string,
    filterItems: Array<string>,
    date: Array<string>,
    values: number
  ) {}

  // filterValues(expression: string) {
  //   return expression
  // }
  getDataFromFireStoreByFiltering(
    filterName: string = '',
    filterItems: Array<string> = [],
    date: Array<string> = [],
    values: number = 50,
    expression: string = 'equal'
  ) {
    return this.dados
      .collection('/budget')
      .snapshotChanges()
      .pipe(
        map((data) =>
          data
            .map((data) => data.payload.doc.data())
            .filter((fireData: any) => {
              if (filterName !== '' && values > 0 && filterItems.length > 0) {
                return (
                  fireData.name === filterName &&
                  filterItems?.includes(fireData.items) &&
                  this.functionObject[0][expression](fireData.value, values)
                );
              } else if (filterName !== '' && values > 0) {
                return (
                  fireData.name === filterName &&
                  this.functionObject[0][expression](fireData.value, values)
                );
              }
              return fireData;
            })
        )
      );
  }
}
