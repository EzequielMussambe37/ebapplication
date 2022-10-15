import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.css'],
})
export class OptionsPageComponent implements OnInit {
  constructor(private routes: Router) {}

  ngOnInit(): void {}

  homePage() {
    this.routes.navigate(['budget']);
  }

  showGraphs() {
    this.routes.navigate(['result/report']);
  }
}
