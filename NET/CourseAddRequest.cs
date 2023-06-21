using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class CourseAddRequest
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
        public int LectureTypeId { get; set; }
        [Required]
        [MinLength(1)]
        public string CoverImageUrl { get; set; }
    }
}
