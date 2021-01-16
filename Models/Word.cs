using System.Collections.Generic;

namespace MemUp.Models
{
    public class Word : BaseModel
    {
        public string JapaneseVocab { get; set; }
        public string KanaVocab { get; set; }
        public string EnglishVocab { get; set; }
        public string PartOfSpeech { get; set; }

        /* Relationships Setup */
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Sentence> Sentences { get; set; }
    }
}
