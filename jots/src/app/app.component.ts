import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { auth } from 'firebase';

export interface Item { }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Justice On Time System';
  isLoggedIn: Boolean = false;
  constructor(private afs: AngularFirestore, public authService: AuthService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    var itemDoc, item, userCases = [], deadlinePassCases = [], deadlineComingcases = [];
    this.authService.user.subscribe((user: any) => {
      console.log('runshere')
      if (!this.isLoggedIn && user.uid) {
        console.log(user.uid, this.isLoggedIn);
        this.isLoggedIn = true;
        this.cdr.detectChanges();
      }
      itemDoc = afs.doc<Item>('users/' + user.uid);
      item = itemDoc.valueChanges();
      item.subscribe(async (userDoc: any) => {
        for await (let [index, cases] of userDoc.cases.entries()) {
          let docSnapshot = afs.doc<Item>('cases/' + cases).snapshotChanges();
          docSnapshot.subscribe(data => {
            userCases.push(data.payload.data());
            let deadline = data.payload.get('deadline');
            var curr = Math.floor(new Date().getTime() / 1000);


            if (deadline && curr > deadline.seconds) {
              deadlinePassCases.push(data.payload.get('name'));
            }
            else if (deadline && (deadline.seconds - curr) < (60 * 60 * 24 * 3)) {
              deadlineComingcases.push(data.payload.get('name'));
            }


            if (index == userDoc.cases.length - 1 && deadlinePassCases.length) { //at last case in array
              // this.toastr.error("<ul><li>" + deadlinePassCases.join("</li><li>") + "</ul>", 'Deadline Passed!');
              this.toastr.error(deadlinePassCases.join("<br/>"), 'Deadline Passed!');
            }
            if (index == userDoc.cases.length - 1 && deadlineComingcases.length) { //at last case in array
              // this.toastr.warning("<ul><li>" + deadlineComingcases.join("</li><li>") + "</ul>", 'Deadline Passed!');
              this.toastr.warning(deadlineComingcases.join("<br/>"), 'Deadline Coming!');
            }


          })
        }
      })
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.cdr.detectChanges();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }


}
