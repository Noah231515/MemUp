using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MemUp.Models
{
    public class SentenceType : BaseModel
    {
        public string Type { get; set; }

        /* Relationships Setup */
        [JsonIgnore]
        public virtual ICollection<Sentence> Sentences { get; set; }
        
    }
}