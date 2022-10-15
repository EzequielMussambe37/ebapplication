import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';

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

  login() {}

  authentificar(userName: string, passWord: string = '') {
    if (attempts > 2) {
      alert('Excedeu as tentativas.');
      return;
    }
    const refs = this.dados;

    this.stores.getUserName().pipe(
      //switchMap(),
      takeUntil(this.destroy$)
    );
  }

  isAuthenticated() {
    return this.isLogin;
  }
}
