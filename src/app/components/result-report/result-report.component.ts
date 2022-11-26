import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { PeriodicDataFireStore } from '../../interfaces/g-interface';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBoxComponent } from '../update-box/update-box.component';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-result-report',
  templateUrl: './result-report.component.html',
  styleUrls: ['./result-report.component.css'],
})
export class ResultReportComponent implements OnInit, AfterViewInit {
  // 'delete';
  displayedColumns: string[] = [
    'items',
    'value',
    'date',
    'time',
    'delete',
    'edit',
  ];
  // dataSource: any = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  //dataSource: any;
  dataSource = new MatTableDataSource<PeriodicDataFireStore>();
  fireStoreData: Array<any> = [];
  JSON = JSON;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  // @ViewChild(MatSort) set matSort(sort: MatSort) {
  //   this.dataSource.sort = sort;
  // }

  constructor(
    private routes: Router,
    private stores: FirestoreDataService,
    public dialog: MatDialog // dados: AngularFirestore
  ) {
    this.fireStoreData = this.stores.dataFromFireStore;
    this.dataSource = new MatTableDataSource(this.fireStoreData);
  }

  ngOnInit(): void {
    // this.fireStoreData = this.stores.dataFromFireStore;
    // this.dataSource = new MatTableDataSource(this.fireStoreData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  backResult() {
    this.routes.navigate(['result']);
  }
  deleteRecord(row: any) {
    this.stores.deleteFromFireStore(row).subscribe((data: any) => {
      console.log('this is the folder');
      console.log(data);
      if (this.stores.storeDataSize !== data.length) {
        this.stores.dataFromFireStore = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      } else if (this.stores.storeDataSize === data.length) {
        console.log('this is fine???????????????');
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (data.length === 0) {
        } else {
          alert('DATA WAS NOT SUCCESSFULLY DELETED');
        }
        return;
      }
    });
  }
  applyFilter(e: any) {
    // const filterValue = (e.target as HTMLInputElement).value;
    console.log(e.value.trim());
    // console.log(this.dataSource.filter);
    this.dataSource.filter = e.value.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  editRecord(record: any) {
    const s = record;
    const dialogRef = this.dialog.open(UpdateBoxComponent, {
      // width: '250px',
      data: record,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('this is result from update');
      console.log(result);
      if (result) {
        this.stores.updateRecordFromFireStore(result);
        return;
      }
      alert('Se alguma alteração foi feita; você não as salvou');
    });

    // dialogRef.close();
  }
}
