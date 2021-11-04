import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/services/todoItem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todoItem-details',
  templateUrl: './todoItem-details.component.html',
  styleUrls: ['./todoItem-details.component.css']
})
export class TodoItemDetailsComponent implements OnInit {
  currentTodoItem:any = null;
  message = '';

  constructor(
    private TodoItemService: TodoItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodoList(this.route.snapshot.paramMap.get('id'));
  }

  getTodoList(id:any): void {
    this.TodoItemService.get(id)
      .subscribe(
        data => {
          this.currentTodoItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateTodoItem(): void {
    this.TodoItemService.update(this.currentTodoItem.id, this.currentTodoItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The todo item was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTodoItem(): void {
    this.TodoItemService.delete(this.currentTodoItem.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/todoItems']);
        },
        error => {
          console.log(error);
        });
  }
}