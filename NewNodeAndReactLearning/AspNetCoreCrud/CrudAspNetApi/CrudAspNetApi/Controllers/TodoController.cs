﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudAspNetApi.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        ITodoRepository TodoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            TodoRepository = todoRepository;
        }

        [HttpGet(Name = "GetAllItems")]
        public IEnumerable<TodoItem> Get()
        {
            var result =  TodoRepository.Get();
            return result;
        }

        [HttpGet("{id}", Name = "GetTodoItem")]
        public IActionResult Get(int Id)
        {
            TodoItem todoItem = TodoRepository.Get(Id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return new ObjectResult(todoItem);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TodoItem todoItem)
        {
            if (todoItem == null)
            {
                return BadRequest();
            }
            TodoRepository.Create(todoItem);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int Id, [FromBody] TodoItem updatedTodoItem)
        {
            if (updatedTodoItem == null || updatedTodoItem.Id != Id)
            {
                return BadRequest();
            }

            var todoItem = TodoRepository.Get(Id);
            if (todoItem == null)
            {
                return NotFound();
            }

            TodoRepository.Update(updatedTodoItem);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int Id)
        {
            var deletedTodoItem = TodoRepository.Delete(Id);

            if (deletedTodoItem == null)
            {
                return BadRequest();
            }

            return new ObjectResult(deletedTodoItem);
        }
    }
}
