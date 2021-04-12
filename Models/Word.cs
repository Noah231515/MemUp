using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace MemUp.Models
{
    public class Word : BaseModel
    {
        public Guid CourseId { get; set; }
        public string JapaneseVocab { get; set; }
        public string KanaVocab { get; set; }
        public string EnglishVocab { get; set; }
        public string PartOfSpeech { get; set; }

        public int DifficultyIndex { get; set; }

        /* Relationships Setup */
        [JsonIgnore]
        public virtual Course Course { get; set; }
        public virtual ICollection<Sentence> Sentences { get; set; }
    }
}
