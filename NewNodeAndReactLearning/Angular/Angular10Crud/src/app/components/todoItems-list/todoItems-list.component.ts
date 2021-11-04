import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/services/todoItem.service';

@Component({
  selector: 'app-todoItems-list',
  templateUrl: './todoItems-list.component.html',
  styleUrls: ['./todoItems-list.component.css']
})
export class TodoItemsListComponent implements OnInit {

  todoItems: any;
  currentTodoItem = null;
  currentIndex = -1;
  text = '';

  constructor(private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.retrieveTodoItems();
  }

  retrieveTodoItems(): void {
    this.todoItemService.getAll()
      .subscribe(
        data => {
          this.todoItems = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTodoItems();
    this.currentTodoItem = null;
    this.currentIndex = -1;
  }

  setActiveTodoItem(todoItem:any, index:any): void {
    this.currentTodoItem = todoItem;
    this.currentIndex = index;
  }

  removeAllTodoItems(): void {
    this.todoItemService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTodoItems();
        },
        error => {
          console.log(error);
        });
  }

  searchText(): void {
    this.todoItemService.findByText(this.text)
      .subscribe(
        data => {
          this.todoItems = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}