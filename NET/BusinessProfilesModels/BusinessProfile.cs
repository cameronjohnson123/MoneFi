using Sabio.Models.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.BusinessProfiles
{
    public class BusinessProfile : BaseBusinessProfile
    { 
        public int EIN { get; set; }
        public LookUp StatusType { get; set; }
        public LookUp BusinessType { get; set; }
        public LookUp IndustryType { get; set; }
        public int ProjectedAnnualBusinessIncome { get; set; }
        public int AnnualBusinessIncome { get; set; }
        public BusinessStage BusinessStage { get; set; }
        public string Logo { get; set; }
        public int LocationId { get; set; }
        public string City { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
