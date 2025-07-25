using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Interfaces
{
    public interface IBranchRepository : IEntityModelRepository<Branch, int>
    {
        Branch GetBranchClientById(int id);
        IEnumerable<Branch> GetAllByClientId(int clientId);
        IEnumerable<Branch> GetAllWithClients();
        IEnumerable<Branch> GetBranchByNameOrTags(string searchCriteria);
        IEnumerable<Branch> GetAllByTags(string[] tags);
        IEnumerable<Branch> GetAllByEventTypesAndCriteria(string criteria, IEnumerable<int> enumerable);
    }
}
