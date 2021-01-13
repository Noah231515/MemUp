using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Threading.Tasks;  
using MemUp.Models;  
using Microsoft.AspNetCore.Mvc;

namespace MemUp.Controllers
{
    public class WordController : ControllerBase
    {
       private readonly IWordService wordService;

       public WordController(IWordService serv)
       {
           wordService = serv;
       }        

       [HttpGet]
       public IEnumerable<Word> GetWords()
       {
           return wordService.GetWords();
       }
    }
}