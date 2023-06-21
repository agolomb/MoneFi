using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using SendGrid;
using Sabio.Models;
using Sabio.Models.Domain;
using System.Collections.Generic;
using Sabio.Models.AppSettings;
using Microsoft.Extensions.Options;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController    
    {
        private IUserService _service = null;
        private AppKeys _appKeys = null;
        private IAuthenticationService<int> _authService = null;

        public UserApiController(IOptions<AppKeys> appKeys 
            , IUserService service                   
            , ILogger<UserApiController> logger                         
            , IAuthenticationService<int> authService) : base(logger)   
        {
            _appKeys = appKeys.Value;
            _service = service;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<SuccessResponse> Login(UserLoginRequest tryUser)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Task<bool> loggedIn = _service.LogInAsync(tryUser.Email, tryUser.Password); ;
                
                if (loggedIn.Result.Equals(false))
                {
                    iCode = 404;
                    response = new ErrorResponse("Login failed!");
                }
                else
                {
                    response = new SuccessResponse();
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}.");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("logout")]  
        public ActionResult<ItemResponse<bool>> LogOut()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _authService.LogOutAsync();
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}.");
            }
            return StatusCode(iCode, response);
        }

        [AllowAnonymous]
        [HttpPost("")]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Create(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;

                string requestUrl = _appKeys.DomainUrl + "/";

                _service.UserAccountValidation(id, model, requestUrl);

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

        [HttpGet("{id:int}")]  
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                User aUser = _service.GetById(id); ;

                if (aUser == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("User not found!");
                }
                else
                {
                    response = new ItemResponse<User> { Item = aUser };
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}.");
            }
            return StatusCode(iCode, response);
        }

        [AllowAnonymous]
        [HttpPost("confirm/{token}")]
        public ActionResult<ItemResponse<bool>> ConfirmNewUser(string token)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                UserToken userToken = _service.GetTokenByToken(token); ;

                if (userToken == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Token not found!");
                }
                else
                {
                    _service.ConfirmUser(userToken.UserId);

                    _service.DeleteTokenByToken(token);

                    response = new SuccessResponse();
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}.");
            }
            return StatusCode(iCode, response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("paginate")]  
        public ActionResult<ItemResponse<Paged<User>>> GetPaginated(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<User> list = _service.GetPaginated(pageIndex, pageSize);

                if (list == null)
                {
                    ErrorResponse errorResponse = new ErrorResponse("Records Not Found");
                    result = NotFound404(errorResponse);
                }
                else
                {
                    ItemResponse<Paged<User>> response = new ItemResponse<Paged<User>>();
                    response.Item = list;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse($"Generic Error: {ex.Message}.")); 
            }
            return result;
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

        [HttpGet("current")] 
        public ActionResult<ItemResponse<UserRoles>> GetCurrentUser()
        {
            int iCode = 200;
            BaseResponse response = null;

            IUserAuthData user = _authService.GetCurrentUser();

            try
            {
                UserRoles aUser = _service.GetWithRolesById(user.Id); ;

                if (aUser == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("User not found!");
                }
                else
                {
                    response = new ItemResponse<UserRoles> { Item = aUser };
                }
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}.");
            }
            return StatusCode(iCode, response);
        }
    }
}
