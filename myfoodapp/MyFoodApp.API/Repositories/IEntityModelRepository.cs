using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IEntityModelRepository<T, K>
    {
        void Create(T entity);
        T GetByKey(K entityId);
        ICollection<T> GetAll();
        void Update(T entity);
        void DeleteByKey(K id);
        void DeleteByEntity(T entity);
    }
}
