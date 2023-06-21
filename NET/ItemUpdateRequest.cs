using MoneFi.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneFi.Models.Requests
{
    public class ItemUpdateRequest : ItemAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
        [Required]
        public int StatusId { get; set; }
    }
}
