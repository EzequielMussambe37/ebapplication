import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-result-plotly',
  templateUrl: './result-plotly.component.html',
  styleUrls: ['./result-plotly.component.css'],
})
export class ResultPlotlyComponent implements OnInit {
  constructor(private routes: Router) {}

  ngOnInit(): void {}
  homePage() {
    this.routes.navigate(['budget']);
  }
}
