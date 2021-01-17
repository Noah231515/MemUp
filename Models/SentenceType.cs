using System.Collections.Generic;

namespace MemUp.Models
{
    public class SentenceType : BaseModel
    {
        public string Type { get; set; }

        /* Relationships Setup */
        public virtual ICollection<Sentence> Sentences { get; set; }
        
    }
}