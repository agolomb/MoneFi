using MoneFi.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneFi.Models.Requests
{
    public class ItemAddRequest
    {
        [Required]
        [MinLength(1)]
        public string Title { get; set; }
        [Required]
        [MinLength(1)]
        public string Subject { get; set; }
        [Required]
        [MinLength(1)]
        public string Description { get; set; }
        [Required]
        public int InstructorId { get; set; }
        [Required]
        [MinLength(1)]
        public string Duration { get; set; }
        [Required]
        public int LookUpTypeId { get; set; }
        [Required]
        [MinLength(1)]
        public string CoverImageUrl { get; set; }
    }
}
