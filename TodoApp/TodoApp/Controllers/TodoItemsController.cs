using DomainModels;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.Dtos;
using TodoApp.Mappings;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private ITodoItemRepository _repository;
        private TodoItemMapper _mapper;

        public TodoItemsController(
            ITodoItemRepository repository,
            TodoItemMapper mappings)
        {
            _repository = repository;
            _mapper = mappings;
        }

        [HttpPost]
        public async Task<ActionResult<TodoItemReadDto>> CreateTodoItem([FromBody] TodoItemCreateDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var item = _mapper.FromDto(itemDto);

            var created = _repository.Create(item);

            await _repository.SaveChangesAsync();

            return Ok(created);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemReadDto>>> GetTodoItems([FromQuery] DateTime? date)
        {
            IEnumerable<TodoItem> items =
                await (date != null ? _repository.GetFromDate(date.Value) : _repository.Get());

            return Ok(_mapper.ToDto(items));
        }

        [HttpPut]
        public async Task<ActionResult<TodoItemReadDto>> UpdateTodoItem([FromBody] TodoItemUpdateDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TodoItem update = _mapper.FromDto(itemDto);

            var updatedItem = await _repository.Update(update);
            if (updatedItem == null)
            {
                return NotFound();
            }

            await _repository.SaveChangesAsync();
            return Ok(updatedItem);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItemReadDto>> DeleteTodoItem(long id)
        {
            TodoItem toRemove = await _repository.Delete(id);
            if (toRemove == null)
            {
                return NotFound();
            }
            await _repository.SaveChangesAsync();
            return Ok(_mapper.ToDto(toRemove));
        }
    }
}
