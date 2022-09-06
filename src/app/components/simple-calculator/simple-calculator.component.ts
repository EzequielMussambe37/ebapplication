import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
interface FinalData {
  items: string;
  name: string;
  value: any;
}

@Component({
  selector: 'app-simple-calculator',
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.css'],
})
export class SimpleCalculatorComponent implements OnInit {
  constructor(private dados: AngularFirestore) {}
  hide = true;

  data: FinalData = {
    items: '',
    name: '',
    value: null,
  };
  interface: Array<string> = ['Saldo', 'Beleza', 'Medicacao', 'ed'];

  listOfFiles: any;
  ngOnInit(): void {}
  // dados = getFirestore();

  saveResult() {
    console.log(this.data);

    //this.dados.collection('/budget').add(this.data);
    // const refs = this.dados
    //   .collection('/budget')
    //   .snapshotChanges()
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    //https://github.com/code1ogic/Angular-Firebase-crud
    const refs = this.dados
      .collection('/budget')
      .snapshotChanges()
      .subscribe((data) => {
        this.listOfFiles = data.map((e: any) => {
          const single = e.payload.doc.data();
          single.id = e.payload.doc.id;
          return single;
        });

        console.log(this.listOfFiles);
      });

    this.clearAll();
  }

  clearAll() {
    this.data.items = '';
    this.data.name = '';
    this.data.value = null;
  }
}
