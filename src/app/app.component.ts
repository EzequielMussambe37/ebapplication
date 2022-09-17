import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GeneralServicesService } from './services/general-services.service';

declare global {
  var creds: string;
  var attempts: number;
}

globalThis.creds = 'Login';
globalThis.attempts = 0;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //(private gServices: GeneralServicesService) {}
}
