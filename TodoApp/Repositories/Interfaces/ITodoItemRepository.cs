using DomainModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ITodoItemRepository
    {
        TodoItem Create(TodoItem item);
        Task<TodoItem> Delete(long todoItemId);
        Task<IEnumerable<TodoItem>> Get();
        Task<IEnumerable<TodoItem>> GetFromDate(DateTime date);
        Task<TodoItem> Update(TodoItem item);

        Task<int> SaveChangesAsync();
    }
}