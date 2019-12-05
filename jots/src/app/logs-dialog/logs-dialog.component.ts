import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-logs-dialog',
  templateUrl: './logs-dialog.component.html',
  styleUrls: ['./logs-dialog.component.scss']
})
export class LogsDialogComponent implements OnInit {

  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
  }

  ngOnInit() {
  }

  // close() {
  //   this.dialogRef.close();
  // }

}
