using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;

namespace MyFoodApp.API.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        public InvoiceService(IInvoiceRepository paymentProviderRepository)
        {
            _invoiceRepository = paymentProviderRepository;
        }

        public void Add(Invoice invoice) => _invoiceRepository.Create(invoice);

        public void Delete(long id) => _invoiceRepository.DeleteByKey(id);

        public Invoice Get(long id) => _invoiceRepository.GetByKey(id);

        public ICollection<Invoice> GetAll() =>_invoiceRepository.GetAll();

        public IEnumerable<Invoice> GetInvoicesByBranchId(int branchId)
        {
            return _invoiceRepository.GetInvoicesByBranchId(branchId);
        }

        public void Update(Invoice invoice) => _invoiceRepository.Update(invoice);
    }
}