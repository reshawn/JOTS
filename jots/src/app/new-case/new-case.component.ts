import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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
  // casse: object;

  constructor(private fss: AngularFirestore) { }

  update(item: Item) {
    this.caseDataDoc.update(item); //already predefined
  }
  set(item: Item) {
    this.caseDataDoc.set(item); //already predefined
  }
  ngOnInit() {
  }


  printer(){
    alert('it has been saved');
    console.log(this.casee);
    let c = {
      name: this.casee,
      deadline: this.duedate
    };

    this.IDD = this.fss.createId();
    this.caseDataDoc = this.fss.doc<Item>('cases/' + this.IDD);
    this.set(c)
    

    
  }

}
