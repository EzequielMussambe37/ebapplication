import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  constructor(private http: HttpClient, private dados: AngularFirestore) {}
  dataFromFireStore: any;
  collection: string = '/users';
  storeDataSize: number = 0;
  dataObservable$: any;
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
  getUsers() {
    return this.dados.collection(this.collection).snapshotChanges();
  }

  addDataToFireStore(data: any) {
    try {
      console.log(data.name);
      alert('Addicionado com sucesso');
      this.dados.collection(`/${data.name}`).add(data);
      return this.dados
        .collection(`/${data.name}`)
        .snapshotChanges()
        .pipe(
          map((data: any) =>
            data.map((data: any) => {
              let datas: any = {};
              datas['data'] = data.payload.doc.data();
              datas['id'] = data.payload.doc.id;
              return datas;
            })
          )
        );
    } catch {
      alert('Something went wrong');
      return of(null);
    }
  }

  deleteFromFireStore(userData: any) {
    console.log('info before delete them');
    console.log(userData.data.name);
    console.log(userData.id);
    const collections: any = this.dados.collection(`/${userData.data.name}`);
    collections.doc(userData.id).delete();
    return collections.snapshotChanges().pipe(
      map((data: any) =>
        data.map((data: any) => {
          let datas: any = {};
          datas['data'] = data.payload.doc.data();
          datas['id'] = data.payload.doc.id;
          return datas;
        })
      )
    );
    //return this.getDataFromFireStoreByUser(collection.snapshotChanges());
    //console.log(collection.doc().get().data);
    //   .then((data: any) => {
    //     console.log('this is success');
    //     console.log(data);
    //     return data;
    //   })
    //   .catch((error: any) => {
    //     console.log('this is errors');
    //     return error;
    //});
    //this.ngOnInit()
    // this.dados.collection(`/${userData.data.nome}`).snapshotChanges().doc.delete();
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

  getDataFromFireStoreByUser(ob: any) {
    const nome = '/' + ob.map((data: any) => data.payload.doc.data().nome);
    return this.dados
      .collection(nome)
      .snapshotChanges()
      .pipe(
        map((data: any) =>
          data.map((data: any) => {
            let datas: any = {};
            datas['data'] = data.payload.doc.data();
            datas['id'] = data.payload.doc.id;
            return datas;
          })
        )
      );
  }
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
