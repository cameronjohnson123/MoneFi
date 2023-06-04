using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.BusinessProfiles
{
    public class BusinessProfileAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }
        public int? EIN { get; set; }
        [Required]
        [Range(1, 5)]
        public int StatusId { get; set; }
        [Required]
        [Range(1, 4)]
        public int BusinessTypeId { get; set; }
        [Required]
        [Range(1, 28)]
        public int IndustryTypeId { get; set; }
        [Range(-1000000, 10000000)]
        public int? ProjectedAnnualBusinessIncome { get; set; }
        [Required]
        [Range(-1000000, 10000000)]
        public int AnnualBusinessIncome { get; set; }
        [Required]
        [Range(1, 4)]
        public int BusinessStageId { get; set; }
        [Required]
        [MaxLength(255)]
        public string Logo { get; set; }
        #nullable enable
        public int? LocationId { get; set; }
    }
}
