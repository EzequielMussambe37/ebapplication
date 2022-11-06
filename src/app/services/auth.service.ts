import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map, of, retry, Subject, switchMap, takeUntil } from 'rxjs';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
//import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private dados: AngularFirestore,
    private stores: FirestoreDataService,
    public dialog: MatDialog,
    private routes: Router
  ) {}
  isLogin: boolean = false;
  userName: string = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  // login() {}
  authentificar(userName: string, password: string) {
    return this.stores
      .getUsers()
      .pipe(
        switchMap((data) =>
          this.stores.getDataFromFireStoreByUser(
            data.filter(
              (data: any) =>
                data.payload.doc.data().nome === userName &&
                data.payload.doc.data().key === password
            )
          )
        )
      );
  }
  isAuthenticated() {
    return this.isLogin;
  }
}
