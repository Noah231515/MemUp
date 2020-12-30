using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace MemUp.Models
{
    public class Part
    {
        public long ID { get; set; }
        [ForeignKey("TypeID")]
        // public virtual PartType PartType { get; set; }
        public long TypeID { get; set; }

        public string Name { get; set; }
        public long Rank { get; set; }
        public float BenchmarkScore { get; set; }
        // public ICollection<BuildPart> BuildPart { get; set; }
    }
}