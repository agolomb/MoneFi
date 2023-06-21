using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System.Data;
using Sabio.Models.Domain.Users;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using Stripe.Radar;
using Sabio.Models.Requests;
using System.Net.Mail;
using Microsoft.AspNetCore.Http;

namespace Sabio.Services
{
    public class UserService : IUserService, IBaseUserMapper
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;
        private IEmailService _emailProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider, IEmailService emailProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
            _emailProvider = emailProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }
            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        public int Create(UserAddRequest userModel)
        {
            int userId = 0;
            string procName = "[dbo].[Users_Insert]";

            string password = userModel.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@FirstName", userModel.FirstName);
                paramCollection.AddWithValue("@LastName", userModel.LastName);
                paramCollection.AddWithValue("@Mi", userModel.Mi);
                paramCollection.AddWithValue("@Email", userModel.Email);
                paramCollection.AddWithValue("@Password", hashedPassword);
                paramCollection.AddWithValue("@AvatarUrl", userModel.AvatarUrl);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                paramCollection.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out userId);
            }
            );
            return userId;
        }

        public void SetUserStatus(int userId, int statusId)
        {
            string procName = "[dbo].[Users_UpdateStatus]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", userId);
                paramCollection.AddWithValue("@StatusId", statusId);

            }, null
            );
        }

        public void ConfirmUser(int userId)
        {
            string procName = "[dbo].[Users_Confirm]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", userId);
            }, null
            );
        }

        public User GetById(int userId)
        {
            User thisUser = null;
            string procName = "[dbo].[Users_Select_ById]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", userId);

            }, delegate (IDataReader reader, short set)
            {
                int startIndex = 0;
                LookUpService mapStatus = new LookUpService(_dataProvider);
                thisUser = MapUser(reader, ref startIndex);

                thisUser.Status = mapStatus.MapSingleLookUp(reader, ref startIndex);
            }
            );
            return thisUser;
        }

        public UserRoles GetWithRolesById(int userId)
        {
            UserRoles thisUser = null;  
            string procName = "[dbo].[Users_WithRolesSelect_ById]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", userId);

            }, delegate (IDataReader reader, short set)
            {

                int startIndex = 0;
                
                switch (set)
                {

                    case (0):

                        LookUpService mapStatus = new LookUpService(_dataProvider);
                        thisUser = new UserRoles();
                        thisUser.Id = reader.GetSafeInt32(startIndex++);
                        thisUser.FirstName = reader.GetSafeString(startIndex++);
                        thisUser.LastName = reader.GetSafeString(startIndex++);
                        thisUser.Mi = reader.GetSafeString(startIndex++);
                        thisUser.AvatarUrl = reader.GetSafeString(startIndex++);
                        thisUser.Email = reader.GetSafeString(startIndex++);
                        thisUser.IsConfirmed = reader.GetSafeBool(startIndex++);

                        thisUser.Status = mapStatus.MapSingleLookUp(reader, ref startIndex);
                        
                        break;

                    case (1):

                        if (thisUser.Roles == null) thisUser.Roles = new List<string>();
                        thisUser.Roles.Add(reader.GetSafeString(startIndex));

                        break;

                    default: break;

                }
            }
            );
            return thisUser;
        }

        private static User MapUser(IDataReader reader, ref int startIndex)
        {
            User thisUser = new User();

            thisUser.Id = reader.GetSafeInt32(startIndex++);
            thisUser.FirstName = reader.GetSafeString(startIndex++);
            thisUser.LastName = reader.GetSafeString(startIndex++);
            thisUser.Mi = reader.GetSafeString(startIndex++);
            thisUser.AvatarUrl = reader.GetSafeString(startIndex++);
            thisUser.Email = reader.GetSafeString(startIndex++);
            thisUser.IsConfirmed = reader.GetSafeBool(startIndex++);
            return thisUser;
        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string password)
        {
            UserBase user = null;
            string passwordFromDb = "";
            string procName = "[dbo].[Users_Select_AuthData]";
            List<string> roles = new List<string>();
            bool userConfirmed = false;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);

            }, delegate (IDataReader reader, short set)
            {
                int startIndex = 0;
 
                    switch (set)
                    {
                        case (0):

                            passwordFromDb = reader.GetSafeString(startIndex++);

                            user = new UserBase();
                            user.TenantId = new object();
                            user.TenantId = "CONSTANT_PLACEHOLDER";
                            user.Id = reader.GetSafeInt32(startIndex++);
                            userConfirmed = reader.GetSafeBool(startIndex++);
                            user.Name = email;

                            break;

                        case (1):

                            roles.Add(reader.GetSafeString(startIndex++));

                            break;

                        default:

                            break;
                    }
            }
            );
            if (!(user is null))
            {
                user.Roles = roles;
                bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);
                if (!isValidCredentials || !userConfirmed)
                {
                    user = null;
                }
            }

            return user;
        }

        public Paged<User> GetPaginated(int pageIndex, int pageSize)
        {
            Paged<User> pagedList = null;
            List<User> userList = null;
            int totalCount = 0;
            string procName = "[dbo].[Users_SelectAll]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {
                int startIndex = 0;
                LookUpService mapStatus = new LookUpService(_dataProvider);
                User thisUser = MapUser(reader, ref startIndex);

                thisUser.Status = mapStatus.MapSingleLookUp(reader, ref startIndex);

                totalCount = reader.GetSafeInt32(startIndex++);

                if (userList == null)
                {
                    userList = new List<User>();
                }
                userList.Add(thisUser);
            }
            );

            if (userList != null)
            {
                pagedList = new Paged<User>(userList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public List<BaseUser> GetAll()
        {            
            List<BaseUser> baseUsers = null;
            string procName = "[dbo].[Users_SelectAllV2]";
            _dataProvider.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startIndex = 0;
                    BaseUser aBaseUser = MapBaseUser(reader, ref startIndex);
                    if (baseUsers == null)
                    {
                        baseUsers = new List<BaseUser>();
                    }
                    baseUsers.Add(aBaseUser);
                });
            return baseUsers;
        }
        public UserToken GetTokenByToken(string token)
        {
            UserToken thisToken = null;

            string procName = "[dbo].[UserTokens_Select_ByToken]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);

            }, delegate (IDataReader reader, short set)
            {
                int startIndex = 0;
                thisToken = new UserToken();

                thisToken.Token = reader.GetSafeString(startIndex++);
                thisToken.UserId = reader.GetSafeInt32(startIndex++);
                LookUpService mapStatus = new LookUpService(_dataProvider);
                thisToken.TokenType = mapStatus.MapSingleLookUp(reader, ref startIndex);
            }
            );
            return thisToken;
        }

        public void DeleteTokenByToken(string token)
        {
            string procName = "[dbo].[UserTokens_Delete_ByToken]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);
            }, null
            );
        }

        public void CreateToken(string token, int userId, int tokenType)
        {
            string procName = "[dbo].[UserTokens_Insert]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);
                paramCollection.AddWithValue("@UserId", userId);
                paramCollection.AddWithValue("@TokenType", tokenType);
            }, null
            );
        }

        public void UserAccountValidation(int id,UserAddRequest newUser, string requestUrl) {

            string guid = Guid.NewGuid().ToString();
            int newUserTokenType = 1;
            CreateToken(guid, id, newUserTokenType);

            SendEmailRequest firstEmail = new SendEmailRequest();
            firstEmail.Sender = new EmailInfo();
            firstEmail.Sender.Email = "new.accounts@monefi.com";
            firstEmail.Sender.Name = "Account Management";
            firstEmail.To = new EmailInfo();
            firstEmail.To.Email = newUser.Email;
            firstEmail.To.Name = $"{newUser.FirstName} {newUser.LastName}";
            firstEmail.Subject = "Account Verification";

            string confirmationUrl = $"{requestUrl}confirm?token={guid}";

            _emailProvider.NewUserEmail(firstEmail, confirmationUrl);

        }

        public BaseUser MapBaseUser(IDataReader reader, ref int startingIndex)
        {
            BaseUser baseUser = new BaseUser();

            baseUser.Id = reader.GetSafeInt32(startingIndex++);
            baseUser.FirstName = reader.GetSafeString(startingIndex++);
            baseUser.LastName = reader.GetSafeString(startingIndex++);
            baseUser.Mi = reader.GetSafeString(startingIndex++);
            baseUser.AvatarUrl = reader.GetSafeString(startingIndex++);

            if(baseUser.Id == 0)
            {
                return null;
            }

            return baseUser;
        }
    }
}