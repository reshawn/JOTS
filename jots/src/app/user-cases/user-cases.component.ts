import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-user-cases',
  templateUrl: './user-cases.component.html',
  styleUrls: ['./user-cases.component.scss']
})
export class UserCasesComponent implements OnInit {

  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Item>('cases/lJdtURJ77iGPdimaqZuu');
    this.item = this.itemDoc.valueChanges();
  }

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
