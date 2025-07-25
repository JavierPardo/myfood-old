using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionService
    {
        void Add(ClientTransaction transaction);
        void Update(ClientTransaction transaction);
        ClientTransaction Get(long id);
        ICollection<ClientTransaction> GetAll();
        void Delete(long id);
        IEnumerable<ClientTransaction> GetTransactionsByBranchId(int branchId);
        IEnumerable<ClientTransaction> GetTransactionsByBranchIdAndDate(long id, string startrange, string endrange);
        ClientTransaction GetByEventId(long eventId);
    }
}