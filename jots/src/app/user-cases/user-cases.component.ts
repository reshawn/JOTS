import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, merge } from 'rxjs';
import { AuthService } from '../core/auth.service';


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
  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.authService.user.subscribe((user: any) => {
      console.log(user);
      this.loggedInUserID = user.uid;
      this.itemDoc = afs.doc<Item>('users/' + user.uid);
      console.log('itemdoc', this.itemDoc);
      this.item = this.itemDoc.valueChanges();
      this.item.subscribe(async (userDoc: any) => {
        console.log('cases', userDoc);
        for await (let cases of userDoc.cases) {
          console.log(cases);
          this.cases.push(afs.doc<Item>('users/' + this.loggedInUserID + '/cases/' + cases).valueChanges());
        }
        console.log(this.cases);
        //const try = merge(this.cases.map( obj => obj))
        // combineLatest(this.cases.map(caseObj => caseObj)).subscribe(data => {
        //   console.log('ahhhh', data);
        // })
      })
    });

  }

  // getTransactionsByIDs(caseIDs) {
  //   return combineLatest(caseIDs.map(caseID => getTransactionByID(caseID)));
  // }

  ngOnInit() {

  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
