using System.Collections.Generic;

namespace MemUp.Models
{
    public class Sentence : BaseModel
    {
        public string SentenceText { get; set; }
        public string SentenceType { get; set; }
        public Word Word { get; set; }
    }
}
