using DomainModels;
using Microsoft.EntityFrameworkCore;
using System;

namespace Database
{
    public class TodoAppDbContext : DbContext
    {
        public TodoAppDbContext(DbContextOptions<TodoAppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TodoItem>()
                .Property(e => e.Date)
                .HasColumnType("date");
        }
    }
}
