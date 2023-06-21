using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ICourseService
    {
        Course Get(int id);
        List<CourseSubject> GetSubjects();
        Paged<Course> GetCreatedByPaginated(int id, int page, int pageSize);
        int Add(CourseAddRequest model, int userId);
        Paged<Course> SearchPagination(int pageIndex, int pageSize, string query, int? lectureTypeId);
        Paged<Course> GetPaginated(int pageIndex, int pageSize);
        void Update(CourseUpdateRequest model, int userId);
    }
}