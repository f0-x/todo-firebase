import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private fireStore: AngularFirestore) { }
// Let us define our service methods that our components are going to require
  findAllTodos() {
    return this.fireStore.collection('Todos', ref =>
    ref.orderBy('date', 'desc')).snapshotChanges();
  }
}
