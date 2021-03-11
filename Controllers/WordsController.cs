using MemUp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using MemUp.Services;
using System;
using System.Collections.Generic;

namespace MemUp.Controllers
{
    public class WordsController : Controller
    {
        private readonly ILogger<WordsController> logger;
        private readonly UserManager<ApplicationUser> userManager;
        private IWordsService wordsService;
        

        public WordsController(MemUpDbContext memUpDbContext, ILogger<WordsController> logger, IWordsService wordsService)
        {
            this.logger = logger;
            this.wordsService = wordsService;
        }

        [HttpPut]
        [Route("/words/updatewords")]
        public IActionResult UpdateWords([FromBody] List<Word> words)
        {
            return Ok(wordsService.UpdateWords(words));
        }
    }
}
