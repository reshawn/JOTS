import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, combineLatest, merge } from 'rxjs';
import { AuthService } from '../core/auth.service';
export interface Item { name: string; }


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
  public fss: AngularFirestore;
  // user: Observable<firebase.User>;

  constructor(private afs: AngularFirestore, public authService: AuthService, private cdr: ChangeDetectorRef) {

    this.authService.user.subscribe((user: any) => {
      console.log(user);
      this.loggedInUserID = user.uid;
      this.itemDoc = afs.doc<Item>('users/' + user.uid);
      console.log('itemdoc', this.itemDoc);
      this.item = this.itemDoc.valueChanges();
      this.item.subscribe(async (userDoc: any) => {
        console.log('cases', userDoc);
        for await (let cases of userDoc.cases) {
          // console.log(cases);
          let docSnapshot = afs.doc<Item>('cases/' + cases).snapshotChanges();
          docSnapshot.subscribe(data => {
            this.caseObjects.push(data.payload.data());
            console.log('paypay', data.payload.data());
          })
          console.log(this.caseObjects);
        }

      })
    });

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


  postpone() {
    this.status = "Case postponed";

    var changestat = this.afs.collection('cases').doc('p8vXi5QeZBOUrjjTWu0H');

      var setWithMerge = changestat.set({
        status: "Case postponed"
      }, { merge: true });
  }


  close(){
      this.status = "Case closed";

      var changestat = this.afs.collection('cases').doc('p8vXi5QeZBOUrjjTWu0H');

      var setWithMerge = changestat.set({
        status: "Case Closed"
      }, { merge: true });

    }
    
}
