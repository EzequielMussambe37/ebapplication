import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralServicesService } from '../../services/general-services.service';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { DataToSaveOnFireStore } from '../../interfaces/g-interface';
declare var Plotly: any;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild('dt', { static: false }) dates!: ElementRef;

  minDate: Date;
  maxDate: Date;
  itemsTaks$: Observable<any> | undefined;
  isReportOpen: boolean = true;
  reporText: string = 'Show Report';
  destroy$: Subject<boolean> = new Subject<boolean>();
  //courseObs: Observable<any> | undefined;
  constructor(
    private dados: AngularFirestore,
    public gServices: GeneralServicesService,
    private authServices: AuthService,
    private routes: Router,
    private stores: FirestoreDataService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
    this.maxDate = new Date(currentYear + 5, 11, 31);
  }

  hide = true;
  data: DataToSaveOnFireStore = {
    items: '',
    name: '',
    value: 0,
    details: '',
    date: new Date(),
    time: new Date(),
  };

  // date: new Date(),
  // time: new Date(),
  taskList: Array<string> = Array<string>();

  listOfFiles: any;
  url: string =
    'https://raw.githubusercontent.com/EzequielMussambe37/taskList/master/taskLists.json';
  ngOnInit(): void {
    //this.stores.getDataFromFireStoreByFiltering();
    this.itemsTaks$ = this.gServices.getTasks(this.url);
    //this.resultWithoutRedirect();
  }

  resultWithoutRedirect() {
    this.stores
      .getDataFromFireStoreByUser(this.authServices.userName)
      .subscribe((data) => {
        console.log('All data of the users ========== ');
        console.log(data);
        this.stores.dataFromFireStore = data;
      });
  }
  displayResult() {
    // //https://github.com/code1ogic/Angular-Firebase-crud
    // const refs = this.dados
    //   .collection('/users')
    //   .snapshotChanges()
    //   .subscribe((data: any) => {
    //     this.listOfFiles = data.map((e: any) => {
    //       const single = e.payload.doc.data();
    //       single.id = e.payload.doc.id;
    //       return single.nome;
    //     });
    //   });
  }

  addToDatabase() {
    //try{}
    if (this.data.items && this.data.value) {
      const d = new Date();
      this.data.name = this.authServices?.userName;
      try {
        this.data.date = this.data.date?.toDateString();
      } catch {
        this.data.date = this.data.date;
      }
      this.data.time = d.toLocaleTimeString();
      const dataAdd: any = this.stores.addDataToFireStore(this.data);
      dataAdd.subscribe((data: any) => {
        console.log('current data');
        console.log(data);
        console.log('previous data');
        console.log(this.stores.dataFromFireStore);
        // this.reporText = 'Hide Report';
        //
        this.routes.navigate(['budget']);
        setTimeout((_: any) => {
          this.isReportOpen = false;
          this.routes.navigate(['budget/report']);
        }, 10);

        this.clearAll();
        return;
      });
    }
    //alert('Porfavor completa os campos vazios. Obrigado!');
  }

  clearAll() {
    this.data.items = '';
    this.data.value = 0;
    this.data.details = '';
  }

  showHideReport() {
    console.log(this.isReportOpen);
    if (this.isReportOpen) {
      this.resultPage();
      this.reporText = 'Hide Report';
      this.isReportOpen = false;
      return;
    }
    this.routes.navigate(['budget']);
    this.reporText = 'Show Report';
    this.isReportOpen = true;
  }
  resultPage() {
    this.stores
      .getDataFromFireStoreByUser(this.authServices.userName)
      .subscribe((data) => {
        console.log('All data of the users ========== ');
        console.log(data);
        console.log(this.authServices.userName);
        this.stores.dataFromFireStore = data;
        this.routes.navigate(['budget/report']);
      });
  }
  ngOnDestroy() {
    console.log('this main page was destroyed-----');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
