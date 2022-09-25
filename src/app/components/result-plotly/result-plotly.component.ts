import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
declare var Plotly: any;
@Component({
  selector: 'app-result-plotly',
  templateUrl: './result-plotly.component.html',
  styleUrls: ['./result-plotly.component.css'],
})
export class ResultPlotlyComponent implements OnInit {
  constructor(private routes: Router) {}
  @ViewChild('showresult') plotlypage: ElementRef | undefined;
  ngOnInit(): void {}

  showGraphs() {
    //showresults

    this.plotlypage?.nativeElement;
    var data = [
      {
        x: [
          '2013-10-04 22:23:00',
          '2013-11-04 22:23:00',
          '2013-12-04 22:23:00',
        ],
        y: [1, 3, 6],
        type: 'scatter',
      },
    ];

    Plotly.newPlot('show', data);
    // show
  }
}
