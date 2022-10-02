import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralServicesService } from '../../services/general-services.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, CanActivate } from '@angular/router';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
import { AuthService } from '../../services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { take, takeUntil } from 'rxjs';
import { Subject, interval } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private gServices: GeneralServicesService,
    private authServices: AuthService,
    private dados: AngularFirestore,
    private routes: Router,
    public dialog: MatDialog,
    private stores: FirestoreDataService
  ) {}

  userName: any;
  passWord: any;
  prompts: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
    if (this.authServices.isLogin) {
      this.routes.navigate(['/']);
      this.authServices.userName = '';
      this.authServices.isLogin = false;
      this.loginAndOut('Login');
      return;
    }
    this.openDialogWindow();
    //if (this.prompts)
    //https://github.com/code1ogic/Angular-Firebase-crud
  }

  CanActivate() {}
  loginAndOut(option: string) {
    const element: any = document.getElementById('login-logout');
    element.innerHTML = option;
  }

  openDialogWindow(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { userName: this.userName, passWord: this.passWord },
    });

    dialogRef.afterClosed().subscribe((result) => {
      try {
        this.userName = result.userName;
        this.passWord = result.passWord;
      } catch {}

      if (result?.userName && result?.passWord) {
        this.authentificar(this.userName, this.passWord);
      } else {
        if (result === 0) {
          this.routes.navigate(['/']);
          this.loginAndOut('Login');
          return;
        }
        alert('Por favor preencha o Espacos ');
        this.routes.navigate(['/']);
        this.loginAndOut('Login');
      }
    });
  }

  authentificar(userName: string, passWord: string = '') {
    if (attempts > 2) {
      alert('Excedeu as tentativas.');
      return;
    }
    const refs = this.dados;

    this.stores
      .getUserName()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          const listOfFiles = data.map((e: any) => {
            const single = e.payload.doc.data();
            single.id = e.payload.doc.id;
            return single;
          });
          if (
            userName?.toUpperCase() === listOfFiles[0].nome.toUpperCase() ||
            userName?.toUpperCase() === listOfFiles[1].nome.toUpperCase()
          ) {
            if (passWord !== listOfFiles[0].key.toUpperCase()) {
              alert('Credentiais Errados');
              this.routes.navigate(['/']);
              attempts++;
              return;
            }
            attempts = 0;
            this.routes.navigate(['budget']);
            this.authServices.userName = userName.toUpperCase();
            this.authServices.isLogin = true;
            this.loginAndOut('Logout');
          } else {
            attempts++;
            alert('Credentiais Errados');
            this.routes.navigate(['/']);
            this.loginAndOut('Login');

            return;
          }
        },
        (error) => {
          alert('Something went wrong');
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
