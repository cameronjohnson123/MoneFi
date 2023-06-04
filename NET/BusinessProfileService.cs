using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Domain.BusinessProfiles;
using Sabio.Models.Requests.BusinessProfiles;
using Sabio.Services.Interfaces;
using Sabio.Models;
using Sabio.Models.Domain;

namespace Sabio.Services
{
    public class BusinessProfileService : IBusinessProfileService
    {

        IDataProvider _data = null;
        public BusinessProfileService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<BusinessProfile> GetAll(int pageIndex, int pageSize)

        {
            Paged<BusinessProfile> pagedList = null;
            List<BusinessProfile> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.BusinessProfiles_SelectAll",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    BusinessProfile businessProfile = MapSingleBusinessProfile(reader, ref index, _data);
                    
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }

                    if (list == null)
                    {
                        list = new List<BusinessProfile>();

                    }
                    list.Add(businessProfile);
                }
                );

            if (list != null)
            {
                pagedList = new Paged<BusinessProfile>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public BusinessProfile Get(int id)
        {

            string procName = "[dbo].[BusinessProfiles_SelectById]";

            BusinessProfile businessProfile = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                int index = 0;
                businessProfile = MapSingleBusinessProfile(reader, ref index, _data);

            }
            );
            return businessProfile;
        }

        public List<BusinessProfile> GetByCreatedBy(int id)
        {
            List<BusinessProfile> list = null;

            string procName = "[dbo].[BusinessProfiles_Select_ByCreatedBy]"

            ;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@CreatedBy", id);


            }, delegate (IDataReader reader, short set)
            {

                int index = 0;
                BusinessProfile abusinessProfile = MapSingleBusinessProfile(reader, ref index, _data);
              
                if (list == null)
                {
                    list = new List<BusinessProfile>();
                }
                list.Add(abusinessProfile);

            }
            );
            return list;
        }

        public int Add(BusinessProfileAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[BusinessProfiles_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@UserId", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public Paged<BusinessProfile> Search(int pageIndex, int pageSize, string query, string businessTypeIdQuery)
        {
            Paged<BusinessProfile> pagedList = null;
            List<BusinessProfile> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.BusinessProfiles_Search",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@BusinessTypeIdQuery", businessTypeIdQuery);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;

                    BusinessProfile businessProfile = MapSingleBusinessProfile(reader, ref index, _data);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }

                    if (list == null)
                    {
                        list = new List<BusinessProfile>();
                    }

                    list.Add(businessProfile);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<BusinessProfile>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Update(BusinessProfileUpdateRequest model, int userId)
        {
            string procName = "[dbo].[BusinessProfiles_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[BusinessProfiles_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }

        private static BusinessProfile MapSingleBusinessProfile(IDataReader reader, ref int startingIndex, IDataProvider _data)
        {
            BusinessProfile aBusinessProfile = new BusinessProfile();
            LookUpService mapLookUp = new LookUpService(_data);

            aBusinessProfile.Id = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.UserId = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.Name = reader.GetSafeString(startingIndex++);
            aBusinessProfile.EIN = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.StatusType = mapLookUp.MapSingleLookUp(reader, ref startingIndex);
            aBusinessProfile.BusinessType = mapLookUp.MapSingleLookUp(reader, ref startingIndex);
            aBusinessProfile.IndustryType = mapLookUp.MapSingleLookUp(reader, ref startingIndex);
            aBusinessProfile.ProjectedAnnualBusinessIncome = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.AnnualBusinessIncome = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.BusinessStage = new BusinessStage();
            aBusinessProfile.BusinessStage.Id = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.BusinessStage.Name = reader.GetSafeString(startingIndex++);
            aBusinessProfile.BusinessStage.Value = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.Logo = reader.GetSafeString(startingIndex++);
            aBusinessProfile.LocationId = reader.GetSafeInt32(startingIndex++);
            aBusinessProfile.City = reader.GetSafeString(startingIndex++);
            aBusinessProfile.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aBusinessProfile.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aBusinessProfile;
        }

        private static void AddCommonParams(BusinessProfileAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@EIN", model.EIN);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@BusinessTypeId", model.BusinessTypeId);
            col.AddWithValue("@IndustryTypeId", model.IndustryTypeId);
            col.AddWithValue("@ProjectedAnnualBusinessIncome", model.ProjectedAnnualBusinessIncome);
            col.AddWithValue("@AnnualBusinessIncome", model.AnnualBusinessIncome);
            col.AddWithValue("@BusinessStageId", model.BusinessStageId);
            col.AddWithValue("@Logo", model.Logo);
            col.AddWithValue("@LocationId", model.LocationId);
        }

    }
}
