import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemsListComponent } from './components/todoItems-list/todoItems-list.component';
import { TodoItemDetailsComponent } from './components/todoItem-details/todoItem-details.component';
import { AddTodoItemComponent } from './components/add-todoItem/add-todoItem.component';

const routes: Routes = [
  { path: '', redirectTo: 'todoItems', pathMatch: 'full' },
  { path: 'todoItems', component: TodoItemsListComponent },
  { path: 'todoItems/:id', component: TodoItemDetailsComponent },
  { path: 'add', component: AddTodoItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
