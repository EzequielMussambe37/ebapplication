import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralServicesService } from '../../services/general-services.service';
declare var Plotly: any;
interface FinalData {
  items?: string;
  name?: string;
  value: any;
  text?: string;
}
@Component({
  selector: 'app-simple-calculator',
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.css'],
})
export class SimpleCalculatorComponent implements OnInit {
  constructor(
    private dados: AngularFirestore,
    private gServices: GeneralServicesService
  ) {}

  hide = true;

  data: FinalData = {
    items: undefined,
    name: '',
    value: null,
    text: '',
  };
  taskList: Array<string> = Array<string>();

  listOfFiles: any;
  url: string =
    'https://raw.githubusercontent.com/EzequielMussambe37/taskList/master/taskLists.json';
  ngOnInit(): void {
    this.getTaskServices();
  }
  displayResult() {
    console.log(this.data);
    //https://github.com/code1ogic/Angular-Firebase-crud
    const refs = this.dados
      .collection('/users')
      .snapshotChanges()
      .subscribe((data: any) => {
        this.listOfFiles = data.map((e: any) => {
          const single = e.payload.doc.data();
          single.id = e.payload.doc.id;
          return single.nome;
        });
        console.log(this.listOfFiles);
      });
  }

  addToDatabase() {
    //console.log(this.data);
    //this.data.name =
    this.data.name = this.gServices.userName;
    console.log(this.data);
    if (this.data.items && this.data.value) {
      console.log(this.data);
      this.dados.collection('/budget').add(this.data);
      alert('Addicionado com sucesso');
      this.clearAll();
      return;
    }
    alert('Porfavor completa os campos vazios. Obrigado!');
  }

  getTaskServices() {
    this.gServices.getTasks(this.url).subscribe((task: any) => {
      console.log(task);
      this.taskList = task['tarefas'];
    });
  }
  clearAll() {
    this.data.items = '';
    this.data.name = '';
    this.data.value = null;
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
    //console.log(ss);
    console.log(inicio.toString());
    console.log(finals);
    console.log(day);
    console.log(month);
    console.log(hora);
    //console.log(inicio.getTime());
    var nHoraInicial = Date.now();
    console.log(nHoraInicial.toString());

    const d = new Date();
    let text = d.toLocaleDateString(); //2/09/2022
    console.log(text);
    console.log(d.toLocaleTimeString()); //horas
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
}
