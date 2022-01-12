import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  
  constructor(private afStore: AngularFirestore) { }
  createTodo(todo: any): Promise<any> {
    let detailShort = todo.short.toLowerCase();
    return this.afStore.doc(`/todos/${detailShort}`)
    .set(
      {
        detail : todo.detail,
        detail_short : detailShort,
        date: todo.date,
        status: todo.status,
      }
    )
  }

  removeTodo(id: string): Promise<any>{
    return this.afStore.collection('todos').doc(id).delete();  
  }

  getTodos(): Observable<any> {
    return this.afStore.collection('todos', ref => ref.orderBy('date', 'asc')).snapshotChanges();
  }

  updateTodo(id: string, data: any): Promise<any>{
    return this.afStore.collection('todos').doc(id).update(data);
  }
} 
