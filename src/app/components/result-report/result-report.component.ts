import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { PeriodicDataFireStore } from '../../interfaces/g-interface';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-result-report',
  templateUrl: './result-report.component.html',
  styleUrls: ['./result-report.component.css'],
})
export class ResultReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['producto', 'valore', 'date', 'time', 'delete'];
  // dataSource: any = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  //dataSource: any;
  dataSource = new MatTableDataSource<PeriodicDataFireStore>
  fireStoreData: Array<any> = [];
  JSON = JSON;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<PeriodicDataFireStore>(
    //   this.fireStoreData
    // );
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private routes: Router, private stores: FirestoreDataService) {
    this.fireStoreData = this.stores.dataFromFireStore;
    this.dataSource = new MatTableDataSource(this.fireStoreData);
  }

  ngOnInit(): void {
    // this.fireStoreData = this.stores.dataFromFireStore;
    // this.dataSource = new MatTableDataSource(this.fireStoreData);
  }

  backResult() {
    this.routes.navigate(['result']);
  }
  deleteRecord(row: any) {
    this.stores.deleteFromFireStore(row).subscribe((data:any)=>{
      console.log("this is the folder")
      console.log(data)
      if(this.stores.storeDataSize !== data.length) {

        //this.fireStoreData =data
        this.stores.dataFromFireStore = data
        this.dataSource = new MatTableDataSource(data);
        return
      }
      else if(this.stores.storeDataSize === data.length){
        this.dataSource = new MatTableDataSource(data)
        if(data.length === 0) {
        }
        else {
          alert("DATA WAS NOT SUCCESSFULLY DELETED")
        }
        return
      }

    })
    //console.log(values)

    //values().then(data => console.log(data))
    // this.fireStoreData = this.stores.dataFromFireStore.filter((data:any)=> data.id !== row.id);
    // this.dataSource = new MatTableDataSource(this.fireStoreData);

    //this.ngAfterViewInit()
    //this.userscollection.doc(user.id).delete();
    //this.ngOnInit()
  }
  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    console.log(filterValue.trim());
    console.log(this.dataSource.filter);
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
