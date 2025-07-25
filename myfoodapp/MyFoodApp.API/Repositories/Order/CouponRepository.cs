using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class CouponRepository : EntityModelRepository<Coupon, long>, ICouponRepository
    {
        public CouponRepository(DataContext context, ILogger<Coupon> logger) : base(context, logger)
        {
        }

        public Coupon GetByCode(string code)
        {
            return _dbSet.FirstOrDefault(coupon => coupon.Code == code
            && (
                (coupon.ExpirationType == (int)Enum.ExpirationTypeEnum.Date && coupon.EndDate > DateTime.Now)
                || (coupon.ExpirationType == (int)Enum.ExpirationTypeEnum.Limit && coupon.Limit > coupon.Events.Count())
                )
                );
        }

        public Coupon GetByEventId(long eventId)
        {
            return _dbSet.FirstOrDefault(coupon => coupon.Events.Any(x=>x.Id==eventId)
            && (
                (coupon.ExpirationType == (int)Enum.ExpirationTypeEnum.Date && coupon.EndDate > DateTime.Now)
                || (coupon.ExpirationType == (int)Enum.ExpirationTypeEnum.Limit && coupon.Limit > coupon.Events.Count())
                )
                );
        }
    }
}
