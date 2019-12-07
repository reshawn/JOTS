import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, merge } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LogsDialogComponent } from '../logs-dialog/logs-dialog.component';

export interface Item { name: string; }

@Component({
  selector: 'app-user-cases',
  templateUrl: './user-cases.component.html',
  styleUrls: ['./user-cases.component.scss']
})
export class UserCasesComponent implements OnInit {
  private resolveDataDoc: AngularFirestoreDocument<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;
  loggedInUserID: any;
  casename: any;
  casedeadline: any;
  status: any;
  business: any;
  item: Observable<Item>;
  caseObject: Observable<Item>;
  cases: Observable<Item>[] = [];
  case: Observable<Item>;
  caseObjects: any[] = [];
  username: string;
  constructor(private afs: AngularFirestore, public authService: AuthService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.authService.user.subscribe((user: any) => {
      this.loggedInUserID = user.uid;
      this.username = user.displayName;
      this.itemDoc = afs.doc<Item>('users/' + user.uid);
      this.item = this.itemDoc.valueChanges();
      this.item.subscribe(async (userDoc: any) => {
        for await (let cases of userDoc.cases) {
          // console.log(cases);
          let docSnapshot = afs.doc<Item>('cases/' + cases).snapshotChanges();
          docSnapshot.subscribe(data => {
            var c: any = data.payload.data();
            c.id = data.payload.id;
            this.caseObjects.push(c);
          })
        }

      })
    });

  }

  openDialog(name: String, id: String) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      title: name
    };

    this.dialog.open(LogsDialogComponent, dialogConfig);

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
    this.cdr.detectChanges();
  }

  nextStep() {
    this.step++;
    this.cdr.detectChanges();
  }

  prevStep() {
    this.step--;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
  }


  update(item: Item) {
    this.resolveDataDoc.update(item); //already predefined
  }

  set(item: Item) {
    this.resolveDataDoc.set(item); //already predefined
  }


  postpone(id: string) {
    this.status = "Case postponed";

    var changestat = this.afs.collection('cases').doc(id);

    var setWithMerge = changestat.set({
      status: "Case postponed"
    }, { merge: true });

    let logCol = this.afs.collection('cases/' + id + '/log/');
    let l = {
      action: 'Updated to "Postponed"',
      date: new Date(),
      user: this.username
    };
    logCol.add(l);
  }


  close(id: string) {
    this.status = "Case closed";

    var changestat = this.afs.collection('cases').doc(id);

    var setWithMerge = changestat.set({
      status: "Case Closed"
    }, { merge: true });

    let logCol = this.afs.collection('cases/' + id + '/log/');
    let l = {
      action: 'Updated to "Closed"',
      date: new Date(),
      user: this.username
    };
    logCol.add(l);

  }

}
