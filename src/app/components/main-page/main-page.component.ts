import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralServicesService } from '../../services/general-services.service';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FirestoreDataService } from 'src/app/services/firestore-data.service';
import { DataToSaveOnFireStore } from '../../interfaces/g-interface';
declare var Plotly: any;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('dt', { static: false }) dates!: ElementRef;

  minDate: Date;
  maxDate: Date;
  itemsTaks$: Observable<any> | undefined;
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
    text: '',
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
    this.stores.getDataFromFireStoreByFiltering();
    this.itemsTaks$ = this.gServices.getTasks(this.url);
    this.displayResult();
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
    this.data.name = this.authServices?.userName;
    this.data.date = this.data.date?.toDateString();
    this.data.time = this.data.time?.toLocaleTimeString();
    if (this.data.items && this.data.value) {
      this.stores.addDataToFireStore(this.data);
      this.clearAll();
      return;
    }
    alert('Porfavor completa os campos vazios. Obrigado!');
  }

  getTaskServices() {
    // this.gServices.getTasks(this.url).subscribe((task: any) => {
    //   this.taskList = task['tarefas'];
    // });
  }
  clearAll() {
    this.data.items = '';
    this.data.name = '';
    this.data.value = 0;
    this.data.text = '';
  }

  showGraph() {
    //Plotly.plot();
    // var trace1 = {
    //   type: 'bar',
    //   x: [1, 2, 3, 4],
    //   y: [5, 10, 2, 8],
    //   marker: {
    //     color: '#C8A2C8',
    //     line: {
    //       width: 2.5,
    //     },
    //   },
    // };

    // var data = [trace1];

    // var layout = {
    //   title: 'Consumption',
    //   font: { size: 18 },
    // };

    // var config = { responsive: true };
    //Plotly.newPlot('gd', [{ y: [1, 2, 3], x: [2, 4, 6] }]);
    //Plotly.newPlot('gd', [{ y: [1, 2, 3], x: [2, 4, 6] }]);
    //Plotly.newPlot('gd', data, layout, config);
    // var data = [
    //   {
    //     values: [19, 26, 55],
    //     labels: ['Residential', 'Non-Residential', 'Utility'],
    //     type: 'pie',
    //   },
    // ];

    // var layout = {
    //   height: 400,
    //   width: 500,
    // };

    // Plotly.newPlot('gd', data, layout);
    //new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
    var inicio = new Date();
    let day = inicio.getDate();
    let month = inicio.getMonth();
    let hora = inicio.getHours();
    let finals = inicio.getFullYear();
    //let ss = inicio.now();
    var nHoraInicial = Date.now();
    const d = new Date();
    let text = d.toLocaleDateString(); //2/09/2022
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

    Plotly.newPlot('gd', data);
  }

  resultPage() {
    // this.data.date = this.data.date?.toDateString();
    // this.data.time = this.data.time.toLocaleTimeString();
    this.routes.navigate(['result']);
  }
}
