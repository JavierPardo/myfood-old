using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface ITransactionStatusRepository:IEntityModelRepository<TransactionStatus, int>
    {
    }
}