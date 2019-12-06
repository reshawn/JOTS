import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
export interface Item { name: string; }

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit {
  private caseDataDoc: AngularFirestoreDocument<Item>;

  casee: string;
  duedate: string;
  IDD: string;
  username: string;
  userid: string;
  // casse: object;

  constructor(private fss: AngularFirestore, public authService: AuthService, private toastr: ToastrService) {
    this.authService.user.subscribe((user: any) => {
      this.username = user.displayName;
      this.userid = user.uid;
    });
  }

  update(item: Item) {
    this.caseDataDoc.update(item); //already predefined
  }
  set(item: Item) {
    this.caseDataDoc.set(item); //already predefined
  }
  ngOnInit() {
  }


  printer() {
    console.log(this.casee);
    let c = {
      name: this.casee,
      deadline: this.duedate
    };

    this.IDD = this.fss.createId();
    this.caseDataDoc = this.fss.doc<Item>('cases/' + this.IDD);
    this.set(c)
    let logCol = this.fss.collection('cases/' + this.IDD + '/log/');
    let l = {
      action: 'Created',
      date: new Date(),
      user: this.username
    };
    logCol.add(l);

    var itemDoc = this.fss.doc('users/' + this.userid);
    itemDoc.valueChanges().pipe(take(1)).subscribe((user: any) => {
      if (user.cases)
        user.cases.push(this.IDD);
      else user.cases = [this.IDD];
      itemDoc.update(user);
    })

    // Reset form; Pop up success toast
    this.toastr.success(this.casee + ' case has been created.', 'Case Saved!', {
      disableTimeOut: false,
      tapToDismiss: true,
      positionClass: 'toast-top-right',
      timeOut: 3000
    });
    this.duedate = '';
    this.casee = '';

  }

}
