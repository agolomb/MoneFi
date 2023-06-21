using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MoneFi.Services;
using MoneFi.Services.Interfaces;
using MoneFi.Web.Controllers;
using MoneFi.Web.Models.Responses;
using System.Data.SqlClient;
using System;
using MoneFi.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MoneFi.Models.Domain;
using MoneFi.Models.Requests;
using System.Collections.Generic;

namespace MoneFi.Web.Api.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemApiController : BaseApiController
    {
        private IItemService _service = null;
        private IAuthenticationService<int> _authService = null;
        public ItemApiController(IItemService service,
        ILogger<ItemApiController> logger,
        IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Item>> Get(int id) 
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Item item = _service.Get(id);

                if(course==null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Course not found");
                }
                else 
                {
                    response = new ItemResponse<Course> { Item = course };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }
        [HttpGet]
        public ActionResult<ItemsResponse<ItemSubject>> GetSubjects() {
            int iCode = 200;
            BaseResponse response = null;

            try 
            {
                List<ItemSubject> list = _service.GetSubjects();

                if(list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Subjects not found"); 
                }
                else
                {
                    iCode = 200;
                    response = new ItemsResponse<ItemSubject> { Items = list };
                }
            }
            catch (Exception ex) 
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        
        }

        [HttpGet("createdby/{id:int}")]
        public ActionResult<ItemResponse<Paged<Item>>> GetCreatedByPaginated(int id, int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Item> paged = _service.GetCreatedByPaginated(id, pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Item>> response = new ItemResponse<Paged<Item>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Item>>> GetPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Item> paged = _service.GetPaginated(pageIndex, pageSize);
                if(paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Item>> response = new ItemResponse<Paged<Item>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex) 
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Course>>> SearchPagination(int pageIndex, int pageSize, string query, int? lectureTypeId)
        {
            if (lectureTypeId == null)
            {
                lectureTypeId = null;
            }
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Item> page = _service.SearchPagination(pageIndex, pageSize, query, lectureTypeId);
                if (page == null)
                {
                    code = 404;
                    response = new ItemResponse<Paged<Item>> { Item = page };
                }
                else
                {
                    response = new ItemResponse<Paged<Item>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ItemAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int newItemId = _service.Add(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = newItemId };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ItemUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
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
    }
}
