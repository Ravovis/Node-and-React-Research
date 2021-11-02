using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class EFTodoRepository : ITodoRepository
    {
        private TodoContext Context;
        public IEnumerable<TodoItem> Get()
        {
            return Context.TodoItems;
        }
        public TodoItem Get(int Id)
        {
            return Context.TodoItems.Find(Id);
        }
        public EFTodoRepository(TodoContext context)
        {
            Context = context;
        }
        public void Create(TodoItem item)
        {
            Context.TodoItems.Add(item);
            Context.SaveChanges();
        }
        public void Update(TodoItem updatedTodoItem)
        {
            TodoItem currentItem = Get(updatedTodoItem.Id);
            currentItem.IsComplete = updatedTodoItem.IsComplete;
            currentItem.TaskDescription = updatedTodoItem.TaskDescription;

            Context.TodoItems.Update(currentItem);
            Context.SaveChanges();
        }

        public TodoItem Delete(int Id)
        {
            TodoItem todoItem = Get(Id);

            if (todoItem != null)
            {
                Context.TodoItems.Remove(todoItem);
                Context.SaveChanges();
            }

            return todoItem;
        }
    }
}
