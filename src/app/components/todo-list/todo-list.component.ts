import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  constructor(private todosService: TodosService,
              private afStore: AngularFirestore) {
              }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe(data => {
      this.todos = [];
      data.forEach((element: any) => {
        this.todos.push({
          detail: element.payload.doc.detail,
          ...element.payload.doc.data()
        })
      });
      console.log(this.todos);
    })
  }

  updateTodo(id: string, data: string) {
    this.todosService.updateTodo(id, data).then(() => {
      console.log("Todo has been updated");
    })
  }
  removeTodo(id: string) {
    this.todosService.removeTodo(id).then(() => {
      console.log('Todo has been deleted');
    })
  } 
}
