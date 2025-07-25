using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IInvoiceRepository : IEntityModelRepository<Invoice, long>
    {
        IEnumerable<Invoice> GetInvoicesByBranchId(int branchId);
    }
}