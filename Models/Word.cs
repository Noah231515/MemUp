using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MemUp.Models
{
    public class Word : BaseModel
    {
        public string JapaneseVocab { get; set; }
        public string KanaVocab { get; set; }
        public string EnglishVocab { get; set; }
        public string PartOfSpeech { get; set; }

        /* Relationships Setup */
        [JsonIgnore]
        public virtual Course Course { get; set; }
        [JsonIgnore]
        public virtual ICollection<Sentence> Sentences { get; set; }
    }
}
