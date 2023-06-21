using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class CourseUpdateRequest : CourseAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
        [Required]
        public int StatusId { get; set; }
    }
}
