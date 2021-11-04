import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoItemComponent } from './components/add-todoItem/add-todoItem.component';
import { TodoItemDetailsComponent } from './components/todoItem-details/todoItem-details.component';
import { TodoItemsListComponent } from './components/todoItems-list/todoItems-list.component';
import { HttpClientModule } from '@angular/common/http';
import { D3PlayComponent } from './components/d3-play/d3-play.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoItemComponent,
    TodoItemDetailsComponent,
    TodoItemsListComponent,
    D3PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
