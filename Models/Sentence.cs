using System.Text.Json.Serialization;

namespace MemUp.Models

{
    public class Sentence : BaseModel
    {
        public string SentenceText { get; set; }

        /* Relationships Setup */
        [JsonIgnore]
        public virtual Word Word { get; set; }
        public virtual SentenceType SentenceType { get; set; }
    }
}
