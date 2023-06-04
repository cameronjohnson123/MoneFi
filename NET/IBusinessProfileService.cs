using Sabio.Models;
using Sabio.Models.Domain.BusinessProfiles;
using Sabio.Models.Requests.BusinessProfiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IBusinessProfileService
    {
        Paged<BusinessProfile> GetAll(int pageIndex, int pageSize);

        BusinessProfile Get(int id);

        List<BusinessProfile> GetByCreatedBy(int id);

        Paged<BusinessProfile> Search(int pageIndex, int pageSize, string query, string businessTypeIdQuery);

        void Update(BusinessProfileUpdateRequest model, int currentUserId);

        int Add(BusinessProfileAddRequest model, int currentUserId);

        void Delete(int id);

    }
}
