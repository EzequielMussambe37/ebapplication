import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../../services/general-services.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, CanActivate } from '@angular/router';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
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
    private dados: AngularFirestore,
    private routes: Router,
    public dialog: MatDialog
  ) {}

  userName: any;
  passWord: any;
  prompts: any;
  ngOnInit(): void {
    if (this.gServices.userName !== '') {
      this.routes.navigate(['/']);
      this.gServices.userName = '';
      this.loginAndOut('Login');
      return;
    }
    //this.prompts = prompt('Please usa o seu nome: ');
    this.openDialogWindow();
    //console.log('this is the name: ' + this.prompts);

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

      if (result?.userName) {
        this.authentificar(this.userName, this.passWord);
      } else {
        this.routes.navigate(['/']);
        console.log('this is called');
        this.loginAndOut('Login');
      }
    });
  }

  authentificar(userName: string, passWord: string = '') {
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
          this.routes.navigate(['budget']);
          this.gServices.userName = userName.toUpperCase();
          //const element: any = document.getElementById('login-logout');
          this.loginAndOut('Logout');
          //element.innerHTML = 'Logout';
          console.log('hello people');
        } else {
          this.routes.navigate(['/']);
          console.log('this is called');
          this.loginAndOut('Login');
        }
      });
  }
}
