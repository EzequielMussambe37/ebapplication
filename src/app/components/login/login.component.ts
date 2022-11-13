import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralServicesService } from '../../services/general-services.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  template: '',
  styleUrls: [],
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
      console.log('this is been called');
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
      // width: '250px',
      data: { userName: this.userName, passWord: this.passWord },
    });

    dialogRef.afterClosed().subscribe((result) => {
      try {
        this.userName = result.userName;
        this.passWord = result.passWord;
      } catch {}

      if (result?.userName && result?.passWord) {
        this.userName =
          this.userName[0].toUpperCase() +
          this.userName.substring(1).toLowerCase();

        console.log('userName: ' + this.userName);
        console.log('password: ' + this.passWord);
        this.authServices
          .authentificar(this.userName, this.passWord)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data: any) => {
              if (data.length > 0) {
                this.loginAndOut('Logout');
                this.authServices.userName = data[0].payload.doc.data().nome;
                this.authServices.isLogin = true;
                attempts = 0;
                this.routes.navigate(['budget']);
              } else {
                if (attempts > 3) {
                  alert('Excedeu as tentativas.');
                  return;
                }
                attempts++;
                this.routes.navigate(['/']);
                setTimeout(() => {
                  this.routes.navigate(['/login']);
                }, 200);
              }
            },
            (error) => {
              alert('something went wrong');
              if (attempts > 3) {
                alert('Excedeu as tentativas.');
                return;
              }
              attempts++;
              this.routes.navigate(['/']);
              setTimeout(() => {
                this.routes.navigate(['/login']);
              }, 100);
            }
          );
      } else {
        if (result === 0) {
          this.routes.navigate(['/']);
          this.loginAndOut('Login');
          return;
        }
        alert('Por favor preencha o Espacos ');
        this.routes.navigate(['/']);
        setTimeout(() => {
          this.routes.navigate(['/login']);
        }, 100);
      }
    });
  }
  ngOnDestroy() {
    console.log('thi sis the destroinggggg;');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
