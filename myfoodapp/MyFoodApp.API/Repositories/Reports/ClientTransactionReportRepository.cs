using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Repositories
{
    public class ClientTransactionReportRepository : EntityModelRepository<ClientTransaction, long>, IClientTransactionReportRepository
    {
        public ClientTransactionReportRepository(DataContext context, ILogger<ClientTransaction> logger)
            : base(context, logger)
        {
        }

        public IEnumerable<ClientTransaction> GetClientTransactionsByDate(DateTime fromDate, DateTime toDate, bool withConciliation, int BranchId)
        {
            return _dbSet
                .Include(c => c.Event)
                .ThenInclude(e => e.Orders)
                .ThenInclude(o => o.OrderStatusHistories)
                .Include(ct => ct.Invoice)
                .Include(ct => ct.PaymentType)
                .Where(ct => ct.TransactionDateTime.Date >= fromDate.Date
                && ct.TransactionDateTime.Date <= toDate.Date
                && ct.Event.Orders.Any(x => x.CurrentStatusId == (int)OrderStatusEnum.Dispatched)
                && (ct.TransactionStatus.Id != (int)TransactionStatusEnum.Conciliate || withConciliation)
                && ct.Event.BranchId == BranchId); 
        }

        public IEnumerable<ClientTransaction> GetClientTransactionsByDateClientOrBranch(DateTime fromDate, DateTime toDate, int BranchId, int ClientId)
        {

            return _dbSet
                .Include(c => c.Event)
                    .ThenInclude(e => e.Orders)
                .Include(c => c.Event)
                    .ThenInclude(e => e.Branch)
                .Include(ct => ct.Invoice)
                .Include(ct => ct.PaymentType)
                    .ThenInclude(pt => pt.PaymentProvider)
                .Include(ct => ct.ClientPayment)
                    .ThenInclude(cp => cp.Client)
                    .ThenInclude(c => c.Branches)
                .Where(ct => ct.TransactionDateTime.Date >= fromDate.Date
                && ct.TransactionDateTime.Date <= toDate.Date
                && ct.Event.Orders.Any(x => x.CurrentStatusId == (int)OrderStatusEnum.Dispatched)
                && ct.Event.BranchId == BranchId
                && ct.Event.Branch.ClientId == ClientId);
        }
    }
}
