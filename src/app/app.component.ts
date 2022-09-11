import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GeneralServicesService } from './services/general-services.service';

declare global {
  var creds: string;
}

globalThis.creds = 'Login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private gServices: GeneralServicesService) {}
  //credentialStatus: string = 'Login';
  credentialStatus = creds;
  //this.gServices.isLogin;
  ngOnInit(): void {
    //this.credentialStatus = this.gServices.isLogin;
  }

  ngAfterViewInit() {
    console.log(this.gServices.isLogin);
  }
  title = 'budget';
}
