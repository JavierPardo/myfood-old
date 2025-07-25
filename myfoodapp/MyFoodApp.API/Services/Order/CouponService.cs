using Microsoft.OpenApi.Extensions;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class CouponService : ICouponService
    {
        private readonly ICouponRepository _couponRepository;
        private readonly IUserSession _userSession;

        public CouponService(ICouponRepository couponRepository, IUserSession userSession)
        {
            _couponRepository = couponRepository;
            _userSession = userSession;
        }
        public void Add(Coupon coupon)
        {
            coupon.BranchId = _userSession.BranchId == 0 ? (int?)null : _userSession.BranchId;
            coupon.ClientId = _userSession.ClientId == 0 ? (int?)null : _userSession.ClientId;
            _couponRepository.Create(coupon);
        }

        public void Delete(long id)
        {
            _couponRepository.DeleteByKey(id);
        }

        public Coupon Get(long id)
        {
            return _couponRepository.GetByKey(id);
        }

        public IEnumerable<Coupon> GetAll()
        {
            return _couponRepository.GetAll();
        }

        public Coupon GetByCode(Coupon coupon)
        {
            return _couponRepository.GetByCode(coupon.Code);
        }

        public Coupon GetByEventId(long eventId)
        {
            return _couponRepository.GetByEventId(eventId);
        }

        public object GetMetadata()
        {

            var couponTypes = System.Enum.GetValues(typeof(CouponTypeEnum))
                            .Cast<CouponTypeEnum>()
                            .Select(e => new KeyValueDto<int> { Id = (int)e, Description = e.GetDisplayName() });
            var expirationType = System.Enum.GetValues(typeof(ExpirationTypeEnum))
                            .Cast<ExpirationTypeEnum>()
                            .Select(e => new KeyValueDto<int> { Id = (int)e, Description = e.GetDisplayName() });
            return new { couponTypes, expirationType };
        }

        public void Update(Coupon coupon)
        {
            _couponRepository.Update(coupon);
        }

        public void UpdateActiveFlag(Coupon coupon)
        {
            var dbCoupon = _couponRepository.GetByKey(coupon.Id);
            dbCoupon.IsActive = coupon.IsActive;
            _couponRepository.Update(dbCoupon);
        }
    }
}
