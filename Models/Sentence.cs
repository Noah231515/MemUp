using System.Text.Json.Serialization;
using System;

namespace MemUp.Models

{
    public class Sentence : BaseModel
    {
        public string SentenceText { get; set; }
        public Guid WordId { get; set; }

        /* Relationships Setup */
        [JsonIgnore]
        public virtual Word Word { get; set; }
        public virtual SentenceType SentenceType { get; set; }
    }
}
