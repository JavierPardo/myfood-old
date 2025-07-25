using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class BranchPaymentTypeService : IBranchPaymentTypeService
    {
        private readonly IBranchPaymentTypeRepository _branchPaymentTypeRepository;

        public BranchPaymentTypeService(IBranchPaymentTypeRepository branchRepository)
        {
            _branchPaymentTypeRepository = branchRepository;
        }
        public void Add(BranchesPaymentTypes client) => _branchPaymentTypeRepository.Create(client);

        public void Delete(int id) => _branchPaymentTypeRepository.DeleteByKey(id);

        public BranchesPaymentTypes Get(int id) => _branchPaymentTypeRepository.GetByKey(id);

        public ICollection<BranchesPaymentTypes> GetAll() => _branchPaymentTypeRepository.GetAll();

        public void Update(BranchesPaymentTypes client) => _branchPaymentTypeRepository.Update(client);
    }
}
