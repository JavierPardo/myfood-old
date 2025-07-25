using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Infrastructure.Extension;

namespace MyFoodApp.API.Services
{
    public class PaymentTypeService : IPaymentTypeService
    {
        private readonly IPaymentTypeRepository _paymentTypeRepository;
        private readonly IImagesStorage _imagesStorage;

        public PaymentTypeService(IPaymentTypeRepository paymentTypeRepository,
            IImagesStorage imagesStorage)
        {
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("payment-type");
            _paymentTypeRepository = paymentTypeRepository;
        }

        public void Add(PaymentType paymentType)
        {
            string imageDataUrl = paymentType.Logo;
            _paymentTypeRepository.Create(paymentType);
            paymentType.Logo = _imagesStorage.StoreImage(paymentType.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(int id) => _paymentTypeRepository.DeleteByKey(id);

        public PaymentType Get(int id)
        {
            var paymentType=_paymentTypeRepository.GetByKey(id);
            paymentType.Logo = _imagesStorage.GetImage(paymentType.Id.EncodeAsBase32String());
            return paymentType;
        }

        public IEnumerable<PaymentType> GetAll()
        {
            foreach (var paymentType in _paymentTypeRepository.GetAll())
            {
                paymentType.Logo = _imagesStorage.GetImage(paymentType.Id.EncodeAsBase32String());
                yield return paymentType;
            }
        }

        public IEnumerable<PaymentType> GetPaymentTypesByBranchId(int branchId)
        {
            foreach (var paymentType in _paymentTypeRepository.GetPaymentTypesByBranchId(branchId))
            {
                paymentType.Logo = _imagesStorage.GetImage(paymentType.Id.EncodeAsBase32String());
                yield return paymentType;
            }
        }

        public void Update(PaymentType paymentType)
        {
            string imageDataUrl = paymentType.Logo;
            _paymentTypeRepository.Update(paymentType);
            paymentType.Logo = _imagesStorage.StoreImage(paymentType.Id.EncodeAsBase32String(), imageDataUrl);
        }
    }
}
