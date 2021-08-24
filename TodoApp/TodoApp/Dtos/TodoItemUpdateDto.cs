using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Dtos
{
    public class TodoItemUpdateDto
    {
        [Required]
        public long? TodoItemId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime? Date { get; set; }
        [Required]
        public bool? IsDone { get; set; }
    }
}
