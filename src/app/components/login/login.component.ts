import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../../services/general-services.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private gServices: GeneralServicesService,
    private dados: AngularFirestore,
    private routes: Router
  ) {}
  prompts: any;
  ngOnInit(): void {
    if (this.gServices.userName !== '') {
      this.routes.navigate(['/']);
      this.gServices.userName = '';
      return;
    }
    this.prompts = prompt('Please usa o seu nome: ');
    //console.log('this is the name: ' + this.prompts);

    //if (this.prompts)
    //console.log(this.data);
    //https://github.com/code1ogic/Angular-Firebase-crud
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
          this.prompts?.toUpperCase() === listOfFiles[0].toUpperCase() ||
          this.prompts?.toUpperCase() === listOfFiles[1].toUpperCase()
        ) {
          this.routes.navigate(['budget']);
          this.gServices.userName = this.prompts.toUpperCase();
          console.log('hello people');
        } else {
          this.routes.navigate(['/']);
        }
      });
    this.gServices.isLogin = 'Login';
    creds = 'Login';
    //this.gServices.getUser(this.gServices)
  }

  CanActivate() {}
}
