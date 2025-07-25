using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class TransactionStatusHistoryService : ITransactionStatusHistoryService
    {
        private readonly ITransactionStatusHistoryRepository _transactionStatusHistoryRepository;

        public TransactionStatusHistoryService(ITransactionStatusHistoryRepository transactionStatusHistoryRepository)
        {
            _transactionStatusHistoryRepository = transactionStatusHistoryRepository;

        }
        
        public void Add(TransactionStatusHistory transactionStatusHistory) => _transactionStatusHistoryRepository.Create(transactionStatusHistory);
        public void Update(TransactionStatusHistory transactionStatusHistory) => _transactionStatusHistoryRepository.Update(transactionStatusHistory);
        public TransactionStatusHistory Get(long id) => _transactionStatusHistoryRepository.GetByKey(id);
        public ICollection<TransactionStatusHistory> GetAll() => _transactionStatusHistoryRepository.GetAll();
        public void Delete(long id) => _transactionStatusHistoryRepository.DeleteByKey(id);

        public TransactionStatusHistory GetStatusHistoryByTransactionId(long id)
        {
            return _transactionStatusHistoryRepository.GetStatusHistoryByTransactionId(id);
        }
    }
}
