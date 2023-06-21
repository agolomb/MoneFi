using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneFi.Models.Domain
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public BaseUser Instructor { get; set; }
        public string Duration { get; set; }
        public LookUp LectureType { get; set; }
        public string CoverImageUrl { get; set; }
        public LookUp StatusName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser CreatedBy { get; set; }
        public int ModifiedBy { get; set; }

    }
}
