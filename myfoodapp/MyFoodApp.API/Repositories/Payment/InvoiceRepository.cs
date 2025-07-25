using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class InvoiceRepository:EntityModelRepository<Invoice, long>,IInvoiceRepository
    {
        public InvoiceRepository(DataContext dataContext, ILogger<Invoice> logger):base(dataContext, logger)
        {

        }

        public IEnumerable<Invoice> GetInvoicesByBranchId(int branchId)
        {
            throw new System.NotImplementedException();
        }
    }
}