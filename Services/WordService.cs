using Microsoft.EntityFrameworkCore;  
using System;  
using System.Collections.Generic;  
using System.Linq; 

namespace MemUp.Models{

    public class WordService : IWordService
    {
        private readonly MemUpDbContext db;

        public WordService(MemUpDbContext context){
            db = context;
        }

        public IEnumerable<Word> GetWords()
        {
            try
            {
                return db.Word.ToList();
            }
            catch
            {
                throw;
            }
        }


    }

    public interface IWordService
    {
        IEnumerable<Word> GetWords();
    }
}