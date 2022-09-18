import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private gServices: GeneralServicesService,
    private authServices: AuthService,
    private dados: AngularFirestore,
    private routes: Router,
    public dialog: MatDialog
  ) {}

  userName: any;
  passWord: any;
  prompts: any;
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
    //console.log(this.data);
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
      console.log('this is the result');
      console.log(result);
      try {
        this.userName = result.userName;
        this.passWord = result.passWord;
        console.log(result);
      } catch {}

      if (result?.userName && result?.passWord) {
        this.authentificar(this.userName, this.passWord);
      } else {
        alert('Por favor preencha o Espacos ');
        this.routes.navigate(['/']);
        console.log('this is called');
        this.loginAndOut('Login');
      }
    });
  }

  authentificar(userName: string, passWord: string = '') {
    if (attempts > 2) {
      alert('Excedeu as tentativas.');
      return;
    }
    const refs = this.dados
      .collection('/users')
      .snapshotChanges()
      .subscribe((data: any) => {
        const listOfFiles = data.map((e: any) => {
          const single = e.payload.doc.data();
          single.id = e.payload.doc.id;
          return single.nome;
        });
        if (
          userName?.toUpperCase() === listOfFiles[0].toUpperCase() ||
          userName?.toUpperCase() === listOfFiles[1].toUpperCase()
        ) {
          attempts = 0;
          this.routes.navigate(['budget']);
          this.authServices.userName = userName.toUpperCase();
          this.authServices.isLogin = true;
          this.loginAndOut('Logout');
          console.log('hello people');
        } else {
          attempts++;
          alert('Credentiais Errados');
          this.routes.navigate(['/']);
          console.log('this is called');
          this.loginAndOut('Login');

          console.log('this is the repetitions: ' + attempts);
        }
      });
  }
}
