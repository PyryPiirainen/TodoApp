using Database;
using DomainModels;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories
{
    public class TodoItemRepository : ITodoItemRepository
    {
        private TodoAppDbContext _dbContext;

        public TodoItemRepository(TodoAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TodoItem Create(TodoItem item)
        {
            _dbContext.TodoItems.Add(item);
            return item;
        }

        public async Task<IEnumerable<TodoItem>> Get()
        {
            return await _dbContext.TodoItems.ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetFromDate(DateTime date)
        {
            return await _dbContext.TodoItems
                .Where(i => i.Date == date.Date)
                .ToListAsync();
        }

        public async Task<TodoItem> Update(TodoItem item)
        {
            TodoItem existingItem = await GetFromDb(item.TodoItemId);
            if (existingItem == null)
            {
                return null;
            }

            existingItem.Text = item.Text;
            existingItem.Date = item.Date;
            existingItem.IsDone = item.IsDone;

            return existingItem;
        }

        public async Task<TodoItem> Delete(long todoItemId)
        {
            TodoItem existingItem = await GetFromDb(todoItemId);
            if (existingItem == null)
            {
                return null;
            }
            _dbContext.TodoItems.Remove(existingItem);
            return existingItem;
        }

        public Task<int> SaveChangesAsync()
        {
            return _dbContext.SaveChangesAsync();
        }

        private async Task<TodoItem> GetFromDb(long todoItemId)
        {
            return await _dbContext
                .TodoItems
                .Where(i => i.TodoItemId == todoItemId)
                .SingleOrDefaultAsync();
        }
    }
}
