using System;
using System.Collections.Generic;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IClientTransactionReportRepository : IEntityModelRepository<ClientTransaction, long>
    {
        IEnumerable<ClientTransaction> GetClientTransactionsByDate(DateTime fromDate, DateTime toDate, bool withConciliation, int BranchId);
        IEnumerable<ClientTransaction> GetClientTransactionsByDateClientOrBranch(DateTime fromDate, DateTime toDate, int clientId, int branchId);
    }
}
