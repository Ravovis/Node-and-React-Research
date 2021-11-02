using System;

namespace Model
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string TaskDescription { get; set; }
        public bool IsComplete { get; set; }
    }
}
