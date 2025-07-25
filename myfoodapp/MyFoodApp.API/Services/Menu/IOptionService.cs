using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IOptionService
    {
        void Add(Option option);
        void Update(Option option);
        Option Get(long id);
        ICollection<Option> GetAll();
        void Delete(long id);
        ICollection<Option> GetByItem(long itemId);
        ICollection<Option> GetByIdList(IEnumerable<long> idList);
        void UpdateSome(OptionDto optionDTO, long id);
        ICollection<Option> GetOptionsByOrderId(long orderId);
    }
}
