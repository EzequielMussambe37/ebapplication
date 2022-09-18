import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  userName: string | undefined;
  passWord: string | undefined;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
}
