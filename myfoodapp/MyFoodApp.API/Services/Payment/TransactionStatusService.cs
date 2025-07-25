using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class TransactionStatusService : ITransactionStatusService
    {
        private readonly ITransactionStatusRepository _transactionStatusRepository;
        public TransactionStatusService(ITransactionStatusRepository transactionStatusRepository)
        {
            _transactionStatusRepository = transactionStatusRepository;
        }

        public void Add(TransactionStatus transactionStatus) => _transactionStatusRepository.Create(transactionStatus);

        public void Delete(int id) => _transactionStatusRepository.DeleteByKey(id);

        public TransactionStatus Get(int id) => _transactionStatusRepository.GetByKey(id);

        public ICollection<TransactionStatus> GetAll() => _transactionStatusRepository.GetAll();

        public void Update(TransactionStatus transactionStatus) => _transactionStatusRepository.Update(transactionStatus);
    }
}
