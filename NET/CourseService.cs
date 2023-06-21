using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class CourseService : ICourseService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _userMapper = null;

        public CourseService(IDataProvider data, ILookUpService lookUpService, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _userMapper = baseUserMapper;
        }
        public Course Get(int id)
        {
            string procName = "[dbo].[Courses_SelectById]";
            Course course = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                course = MapSingleCourse(reader, ref startingIndex);
            }
            );
            return course;
        }
        public List<CourseSubject> GetSubjects()
        {
           
            List<CourseSubject> subjects = null;
            string procName = "[dbo].[Courses_Select_Unique_Subjects]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CourseSubject aSubject = MapSingleCourseSubject(reader, ref startingIndex);
                    if (subjects == null)
                    {
                        subjects = new List<CourseSubject>();
                    }
                    subjects.Add(aSubject);
                });
            return subjects;
        }
        public Paged<Course> GetCreatedByPaginated(int id, int pageIndex, int pageSize)
        {
            Paged<Course> pagedResult = null;
            List<Course> coursesCreatedByPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Courses_Select_ByCreatedBy]",
                (param) =>
                {
                    param.AddWithValue("@Id", id);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Course course = MapSingleCourse(reader, ref startingIndex);
                    if(totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }                   
                    if (coursesCreatedByPaginated == null)
                    {
                        coursesCreatedByPaginated = new List<Course>();
                    }
                    coursesCreatedByPaginated.Add(course);
                }
                );
            if (coursesCreatedByPaginated != null)
            {
                pagedResult = new Paged<Course>(coursesCreatedByPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Course> SearchPagination(int pageIndex, int pageSize, string query, int? lectureTypeId)
        {
            Paged<Course> pagedResult = null;
            List<Course> coursesSearchPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Courses_SearchV2]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@LectureTypeId", lectureTypeId);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Course course = MapSingleCourse(reader, ref startingIndex);                 
                    if(totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }
                    if (coursesSearchPaginated == null)
                    {
                        coursesSearchPaginated = new List<Course>();
                    }
                    coursesSearchPaginated.Add(course);
                }
                );
            if(coursesSearchPaginated != null) 
            { 
                pagedResult = new Paged<Course>(coursesSearchPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Course> GetPaginated(int pageIndex, int pageSize) 
        {
            Paged<Course> pagedList = null;
            List<Course> coursesPaginated = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[Courses_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Course course = MapSingleCourse(reader, ref startingIndex);
                    if (coursesPaginated == null)
                    {
                        coursesPaginated = new List<Course>();
                    }
                    coursesPaginated.Add(course);
                }
                );
            if (coursesPaginated != null)
            {
                pagedList = new Paged<Course> (coursesPaginated, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public int Add(CourseAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Courses_Insert]";
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
        public void Update(CourseUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Courses_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@StatusId", model.StatusId);
                    collection.AddWithValue("@ModifiedBy", userId);//changed from "model.Id" to "userId"
                },
                returnParameters: null);
        }       
        private Course MapSingleCourse(IDataReader reader, ref int startingIndex)
        {
            Course aCourse = new Course();
            
            aCourse.Id = reader.GetSafeInt32(startingIndex++);
            aCourse.Title = reader.GetSafeString(startingIndex++);
            aCourse.Subject = reader.GetSafeString(startingIndex++);
            aCourse.Description = reader.GetSafeString(startingIndex++);
            aCourse.Instructor = _userMapper.MapBaseUser(reader, ref startingIndex);
            aCourse.Duration = reader.GetSafeString(startingIndex++);
            aCourse.LectureType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aCourse.CoverImageUrl = reader.GetSafeString(startingIndex++);
            aCourse.StatusName = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            aCourse.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aCourse.DateModified = reader.GetSafeDateTime(startingIndex++);
            aCourse.CreatedBy = _userMapper.MapBaseUser(reader, ref startingIndex);
            aCourse.ModifiedBy = reader.GetSafeInt32(startingIndex++);
        
            return aCourse;
        }

        private CourseSubject MapSingleCourseSubject(IDataReader reader, ref int startingIndex)
        {
            CourseSubject aSubject = new CourseSubject();
            aSubject.Subject = reader.GetSafeString(startingIndex++);
            return aSubject;
        }

        private static void AddCommonParams(CourseAddRequest model, SqlParameterCollection collection)
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
