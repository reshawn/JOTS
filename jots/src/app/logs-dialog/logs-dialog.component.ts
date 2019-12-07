import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Item { changed_by: string; }

export interface log {
  changed_by: string;
  date_changed: Date;
}

@Component({
  selector: 'app-logs-dialog',
  templateUrl: './logs-dialog.component.html',
  styleUrls: ['./logs-dialog.component.scss']
})
export class LogsDialogComponent implements OnInit {

  title: string;
  logs: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) data, private afs: AngularFirestore) {
    this.title = data.title;
    var logCollection = afs.collection('cases/' + data.id + '/log');
    logCollection.snapshotChanges().subscribe(data => {
      var doc: any;
      data.forEach((doc: any) => {
        console.log(doc)
        this.logs.push(doc.payload.doc.data());
      });
    });
  }

  ngOnInit() {
  }

  // close() {
  //   this.dialogRef.close();
  // }

}
