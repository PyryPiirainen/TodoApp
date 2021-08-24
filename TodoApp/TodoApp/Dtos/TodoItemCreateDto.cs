using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Dtos
{
    public class TodoItemCreateDto
    {
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime? Date { get; set; }
    }
}
