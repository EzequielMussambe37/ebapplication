import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GeneralServicesService } from '../../services/general-services.service';
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
}
