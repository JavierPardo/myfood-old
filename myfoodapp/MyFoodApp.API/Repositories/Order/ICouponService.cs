using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ICouponService
    {
        object GetMetadata();
        void Update(Coupon coupon);
        void Delete(long id);
        void Add(Coupon coupon);
        Coupon Get(long id);
        IEnumerable<Coupon> GetAll();
        void UpdateActiveFlag(Coupon coupon);
        Coupon GetByCode(Coupon coupon);
        Coupon GetByEventId(long eventId);
    }
}
