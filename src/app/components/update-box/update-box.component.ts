import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { updateRecord } from 'src/app/interfaces/g-interface';
import { GeneralServicesService } from 'src/app/services/general-services.service';

@Component({
  selector: 'app-update-box',
  templateUrl: './update-box.component.html',
  styleUrls: ['./update-box.component.css'],
})
export class UpdateBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: updateRecord,
    public gServices: GeneralServicesService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
    this.maxDate = new Date(currentYear + 5, 11, 31);
  }
  minDate;
  maxDate;
  url: string =
    'https://raw.githubusercontent.com/EzequielMussambe37/taskList/master/taskLists.json';
  itemsTaks$: Observable<any> | undefined;
  ngOnInit(): void {
    this.itemsTaks$ = this.gServices.getTasks(this.url);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
