using MoneFi.Models;
using MoneFi.Models.Domain;
using MoneFi.Models.Requests;
using System.Collections.Generic;

namespace MoneFi.Services.Interfaces
{
    public interface IItemService
    {
        Item Get(int id);
        List<ItemSubject> GetSubjects();
        Paged<Item> GetCreatedByPaginated(int id, int page, int pageSize);
        int Add(ItemAddRequest model, int userId);
        Paged<Item> SearchPagination(int pageIndex, int pageSize, string query, int? lookUpTypeId);
        Paged<Item> GetPaginated(int pageIndex, int pageSize);
        void Update(ItemUpdateRequest model, int userId);
    }
}
