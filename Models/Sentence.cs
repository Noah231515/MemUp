namespace MemUp.Models

{
    public class Sentence : BaseModel
    {
        public string SentenceText { get; set; }

        /* Relationships Setup */
        public Word Word { get; set; }
        public SentenceType SentenceType { get; set; }
    }
}
