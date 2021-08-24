using DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Dtos;

namespace TodoApp.Mappings
{
    public class TodoItemMapper
    {
        public TodoItem FromDto(TodoItemCreateDto create)
        {
            return new TodoItem
            {
                Text = create.Text,
                Date = create.Date.Value,
                IsDone = false
            };
        }

        public TodoItem FromDto(TodoItemUpdateDto update)
        {
            return new TodoItem
            {
                TodoItemId = update.TodoItemId.Value,
                Text = update.Text,
                Date = update.Date.Value,
                IsDone = update.IsDone.Value
            };
        }

        public TodoItemReadDto ToDto(TodoItem item)
        {
            return new TodoItemReadDto
            {
                TodoItemId = item.TodoItemId,
                Text = item.Text,
                Date = item.Date,
                IsDone = item.IsDone
            };
        }

        public IEnumerable<TodoItemReadDto> ToDto(IEnumerable<TodoItem> items)
        {
            return items.Select(i => ToDto(i));
        }

    }
}
