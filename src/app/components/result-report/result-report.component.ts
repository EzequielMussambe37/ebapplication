import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { PeriodicDataFireStore } from '../../interfaces/g-interface';
@Component({
  selector: 'app-result-report',
  templateUrl: './result-report.component.html',
  styleUrls: ['./result-report.component.css'],
})
export class ResultReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'producto', 'valore', 'date'];
  // dataSource: any = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  dataSource: any;
  fireStoreData$: any;
  JSON = JSON;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<PeriodicDataFireStore>(
      this.fireStoreData$
    );
    this.dataSource.paginator = this.paginator;
  }
  constructor(private routes: Router, private stores: FirestoreDataService) {}

  ngOnInit(): void {
    this.fireStoreData$ = this.stores.getDataFromFireStoreByFiltering();
  }

  backResult() {
    this.routes.navigate(['result']);
  }
}