using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MoneFi.Services;
using MoneFi.Web.Controllers;
using MoneFi.Web.Models.Responses;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System;
using MoneFi.Models.Domain.Users;
using MoneFi.Models.Requests.Users;
using SendGrid;
using MoneFi.Models;
using MoneFi.Models.Domain;
using System.Collections.Generic;
using MoneFi.Models.AppSettings;
using Microsoft.Extensions.Options;

namespace MoneFi.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController    
    {
        private IUserService _service = null;
        private IAuthenticationService<int> _authService = null;

        public UserApiController(IUserService service                   
            , ILogger<UserApiController> logger                         
            , IAuthenticationService<int> authService) : base(logger)   
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<BaseUser>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<BaseUser> list = _service.GetAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Users not found");
                }
                else 
                {
                    code = 200;
                    response = new ItemsResponse<BaseUser> { Items = list };
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

    }
}
