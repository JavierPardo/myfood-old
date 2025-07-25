using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchPreferenceHistory
    {
        [Key]
        public long Id { get; set; }
        public DateTime ModifiedDate { get; set; }
        public long ModifiedBy { get; set; }

        public string Old { get; set; }
        public string Current { get; set; }
    }
}
