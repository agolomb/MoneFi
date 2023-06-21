using MoneFi.Data;
using MoneFi.Data.Providers;
using MoneFi.Models;
using MoneFi.Models.Domain;
using MoneFi.Services.Interfaces;
using System.Data;
using MoneFi.Models.Domain.Users;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MoneFi.Models.Requests.Users;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using Stripe.Radar;
using MoneFi.Models.Requests;
using System.Net.Mail;
using Microsoft.AspNetCore.Http;

namespace MoneFi.Services
{
    public class UserService : IUserService, IBaseUserMapper
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
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
