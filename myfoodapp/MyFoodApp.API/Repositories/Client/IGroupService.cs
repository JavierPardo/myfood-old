using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IGroupService
    {
        void Add(Group group);
        void Update(Group group);
        Group Get(int id);
        IEnumerable<Group> GetAll();
        void Delete(int id);
    }
}
