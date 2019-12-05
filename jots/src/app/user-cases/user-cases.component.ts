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

  private itemDoc: AngularFirestoreDocument<Item>;
  loggedInUserID: any;
  item: Observable<Item>;
  caseObject: Observable<Item>;
  cases: Observable<Item>[] = [];
  case: Observable<Item>;
  caseObjects: any[] = [];
  constructor(private afs: AngularFirestore, public authService: AuthService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.authService.user.subscribe((user: any) => {
      this.loggedInUserID = user.uid;
      this.itemDoc = afs.doc<Item>('users/' + user.uid);
      this.item = this.itemDoc.valueChanges();
      this.item.subscribe(async (userDoc: any) => {
        for await (let cases of userDoc.cases) {
          // console.log(cases);
          let docSnapshot = afs.doc<Item>('cases/' + cases).snapshotChanges();
          docSnapshot.subscribe(data => {
            this.caseObjects.push(data.payload.data());
          })
        }

      })
    });

  }

  openDialog(name: String) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
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

}
