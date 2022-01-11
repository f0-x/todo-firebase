import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  //Example: Store the user's info here
  //Cloud Firestore's Collection name = 'users'
  //Document ID = user.email.toLowerCase();
  user: Observable<any>;
  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
                this.user = null as any;
              }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        let emailLower = user.email?.toLowerCase();
        this.user = this.afStore.collection('users').doc(emailLower).valueChanges();
      }
    })
  }

}
