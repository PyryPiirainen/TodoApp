using System;

namespace DomainModels
{
    public class TodoItem
    {
        public long TodoItemId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public bool IsDone { get; set; }
    }
}
