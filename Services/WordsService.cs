using MemUp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;

namespace MemUp.Services
{
    public class WordsService : IWordsService
    {
        private readonly MemUpDbContext memUpDbContext;

        public WordsService(MemUpDbContext memUpDbContext)
        {
            this.memUpDbContext = memUpDbContext;
        }
        
       public List<Word> UpdateWords(List<Word> updatedWords)
       {
            try 
            {
                foreach (var word in updatedWords) 
                {
                    var wordInDb = memUpDbContext.Word
                    .Include(w => w.Sentences)
                    .ThenInclude(s => s.SentenceType)
                    .SingleOrDefault(w => w.Id == word.Id);
                    memUpDbContext.Entry(wordInDb).CurrentValues.SetValues(word);             
                }
                memUpDbContext.SaveChanges();
                return updatedWords;
            }
            catch (Exception e)
            {
                throw e;
            }
       } 
    }

    public interface IWordsService
    {
        List<Word> UpdateWords(List<Word> updatedWords);
    }
}
