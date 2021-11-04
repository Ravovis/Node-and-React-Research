import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/services/todoItem.service';

@Component({
  selector: 'app-add-todoItem',
  templateUrl: './add-todoItem.component.html',
  styleUrls: ['./add-todoItem.component.css']
})
export class AddTodoItemComponent implements OnInit {
  todoItem = {
    id:0,
    taskDescription: '',
    isComplete: false
  };
  submitted = false;

  constructor(private todoItemService: TodoItemService) { }

  ngOnInit(): void {
  }

  saveTodoItem(): void {
    const data = {
      taskDescription: this.todoItem.taskDescription,
      isComplete: this.todoItem.isComplete,
      id:this.todoItem.id,
    };

    this.todoItemService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTodoItem(): void {
    this.submitted = false;
    this.todoItem = {
      id:0,
      taskDescription: '',
      isComplete: false
    };
  }

}