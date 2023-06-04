using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models.Domain.BusinessProfiles;
using System.Data.SqlClient;
using Sabio.Models.Requests.BusinessProfiles;
using Sabio.Models;
using SendGrid;

namespace Sabio.Web.Api.Controllers

{
    [Route("api/businessprofiles")]
    [ApiController]
    public class BusinessProfileApiController : BaseApiController
    {
        private IBusinessProfileService _service = null;
        private IAuthenticationService<int> _authService = null;
        public BusinessProfileApiController(IBusinessProfileService service
            , ILogger<BusinessProfileApiController> logger
            , IAuthenticationService<int> authService
            ) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<BusinessProfile>>> GetAll(int pageIndex, int pageSize)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<BusinessProfile> page = _service.GetAll(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<BusinessProfile>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);

        }
       
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<BusinessProfile>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                BusinessProfile ABusinessProfile = _service.Get(id);

                if (ABusinessProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<BusinessProfile> { Item = ABusinessProfile };
                }
            }
            catch (SqlException ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: { ex.Message }");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("createdby/{id:int}")]
        public ActionResult<ItemsResponse<BusinessProfile>> GetByCreatedBy(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<BusinessProfile> list = _service.GetByCreatedBy(id);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<BusinessProfile> { Items = list };
                }
            }
            catch (SqlException ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(BusinessProfileAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);

            }
            catch (Exception ex)
            {

                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<BusinessProfile>>> Search(int pageIndex, int pageSize, string query, string businessTypeIdQuery)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<BusinessProfile> page = _service.Search(pageIndex, pageSize, query, businessTypeIdQuery);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<BusinessProfile>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(BusinessProfileUpdateRequest model, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
