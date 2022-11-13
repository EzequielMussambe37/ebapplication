import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FirestoreDataService } from './services/firestore-data.service';
import { GeneralServicesService } from './services/general-services.service';

declare global {
  var attempts: number;
}
globalThis.attempts = 0;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private stores: FirestoreDataService,
    private authServices: AuthService //private authServices: AuthService
  ) {}

  title: any;

  ngOnInit(): void {
    // console.log('this is ');
    // this.authServices.authentificar('Ezequiel', 'TERESA1').subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (err) => {
    //     var publication = 'freeCodeCamp';
    //     publication =
    //       publication[0].toUpperCase() + publication.substring(1).toLowerCase();
    //     console.log(publication);
    //     //alert(err);
    //   }
    // );
  }
}
