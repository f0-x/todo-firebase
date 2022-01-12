import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private todoLimit = 5;
  public lastCreatedFiveTodos = [];

  constructor(public afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private todosService: TodosService) { }

  ngOnInit(): void {
  }


  logout():void {
    this.afAuth.signOut();
  }

}
