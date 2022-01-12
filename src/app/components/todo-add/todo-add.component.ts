import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  todoForm!: FormGroup;
  firebaseErrorMessage!: string;

  constructor(private todosService: TodosService,
              private router: Router) {
                this.firebaseErrorMessage = '';
               }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      'detail': new FormControl('', Validators.required),
      'short': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if(this.todoForm.invalid) return;
    this.todosService.createTodo(this.todoForm.value).then((result) => {
      if (result == null)
        this.router.navigate(['/todolist']);
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    })
  }



}
