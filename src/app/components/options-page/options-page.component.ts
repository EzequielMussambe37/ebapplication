import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.css'],
})
export class OptionsPageComponent implements OnInit {
  constructor(private routes: Router, private stores: FirestoreDataService) {}

  ngOnInit(): void {}

  homePage() {
    // this.stores.dataFromFireStore;
    this.routes.navigate(['budget']);
  }

  showGraphs() {
    // this.stores.dataObservable$.subscribe((data: any) => {
    //   this.stores.dataFromFireStore = data;

    // });
    this.routes.navigate(['result/report']);
  }
}
