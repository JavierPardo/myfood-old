using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IInvoiceService
    {
        void Add(Invoice invoice);
        void Update(Invoice invoice);
        Invoice Get(long id);
        ICollection<Invoice> GetAll();
        void Delete(long id);
        IEnumerable<Invoice> GetInvoicesByBranchId(int branchId);
    }
}