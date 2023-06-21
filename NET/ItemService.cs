using MoneFi.Data;
using MoneFi.Data.Providers;
using MoneFi.Models;
using MoneFi.Models.Domain;
using MoneFi.Models.Requests;
using MoneFi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoneFi.Services
{
    public class ItemService : IItemService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _userMapper = null;

        public ItemService(IDataProvider data, ILookUpService lookUpService, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _userMapper = baseUserMapper;
        }
        public Item Get(int id)
        {
            string procName = "[dbo].[Items_SelectById]";
            Course course = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                course = MapSingleItem(reader, ref startingIndex);
            }
            );
            return course;
        }
        public List<ItemSubject> GetSubjects()
        {
           
            List<ItemSubject> subjects = null;
            string procName = "[dbo].[Items_Select_Unique_Subjects]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    ItemSubject aSubject = MapSingleItemSubject(reader, ref startingIndex);
                    if (subjects == null)
                    {
                        subjects = new List<ItemSubject>();
                    }
                    subjects.Add(aSubject);
                });
            return subjects;
        }
        public Paged<Item> GetCreatedByPaginated(int id, int pageIndex, int pageSize)
        {
            Paged<Item> pagedResult = null;
            List<Item> itemsCreatedByPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Items_Select_ByCreatedBy]",
                (param) =>
                {
                    param.AddWithValue("@Id", id);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Item item = MapSingleItem(reader, ref startingIndex);
                    if(totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }                   
                    if (itemsCreatedByPaginated == null)
                    {
                        itemsCreatedByPaginated = new List<Item>();
                    }
                    itemsCreatedByPaginated.Add(item);
                }
                );
            if (itemsCreatedByPaginated != null)
            {
                pagedResult = new Paged<Item>(itemsCreatedByPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Item> SearchPagination(int pageIndex, int pageSize, string query, int? lectureTypeId)
        {
            Paged<Item> pagedResult = null;
            List<Item> itemsSearchPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Items_SearchV2]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@LookUpTypeId", lookUpTypeId);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Item item = MapSingleItem(reader, ref startingIndex);                 
                    if(totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }
                    if (itemsSearchPaginated == null)
                    {
                        itemsSearchPaginated = new List<Course>();
                    }
                    itemsSearchPaginated.Add(course);
                }
                );
            if(itemsSearchPaginated != null) 
            { 
                pagedResult = new Paged<Item>(itemsSearchPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Item> GetPaginated(int pageIndex, int pageSize) 
        {
            Paged<Item> pagedList = null;
            List<Item> itemsPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Items_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Course course = MapSingleItem(reader, ref startingIndex);
                    if (coursesPaginated == null)
                    {
                        itemsPaginated = new List<Item>();
                    }
                    itemsPaginated.Add(item);
                }
                );
            if (itemsPaginated != null)
            {
                pagedList = new Paged<Item> (itemsPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public int Add(ItemAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Items_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@CreatedBy", userId);               
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public void Update(ItemUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Items_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@StatusId", model.StatusId);
                    collection.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }       
        private Item MapSingleItem(IDataReader reader, ref int startingIndex)
        {
            Item aItem = new Item();
            
            aItem.Id = reader.GetSafeInt32(startingIndex++);
            aItem.Title = reader.GetSafeString(startingIndex++);
            aItem.Subject = reader.GetSafeString(startingIndex++);
            aItem.Description = reader.GetSafeString(startingIndex++);
            aItem.Instructor = _userMapper.MapBaseUser(reader, ref startingIndex);
            aItem.Duration = reader.GetSafeString(startingIndex++);
            aItem.LectureType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aItem.CoverImageUrl = reader.GetSafeString(startingIndex++);
            aItem.StatusName = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aItem.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aItem.DateModified = reader.GetSafeDateTime(startingIndex++);
            aItem.CreatedBy = _userMapper.MapBaseUser(reader, ref startingIndex);
            aItem.ModifiedBy = reader.GetSafeInt32(startingIndex++);
        
            return aItem;
        }

        private ItemSubject MapSingleItemSubject(IDataReader reader, ref int startingIndex)
        {
            ItemSubject aSubject = new ItemSubject();
            aSubject.Subject = reader.GetSafeString(startingIndex++);
            return aSubject;
        }

        private static void AddCommonParams(ItemAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Title", model.Title);
            collection.AddWithValue("@Subject", model.Subject);
            collection.AddWithValue("@Description", model.Description);
            collection.AddWithValue("@InstructorId", model.InstructorId);
            collection.AddWithValue("@Duration", model.Duration);
            collection.AddWithValue("@LectureTypeId", model.LectureTypeId);
            collection.AddWithValue("@CoverImageUrl", model.CoverImageUrl);
        }
    }
}
