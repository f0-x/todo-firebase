import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Observable<any>;
  constructor(public afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
                this.user = null as any;
               }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      console.log('Dashboard: user', user);

      if (user) {
        let emailLower = user.email?.toLowerCase();
        this.user = this.afStore.collection('users').doc(emailLower).valueChanges();
      }
    });
  }

}
