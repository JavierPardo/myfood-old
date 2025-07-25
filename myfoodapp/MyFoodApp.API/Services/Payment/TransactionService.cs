using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Entities;
using System.Collections.Generic;
using System.Transactions;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Infrastructure.Extension;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IPaymentTypeRepository _paymentTypeRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IBranchPreferenceService _branchPreferenceService;
        private readonly IImagesStorage _imagesStorage;

        public TransactionService(ITransactionRepository transactionRepository, IPaymentTypeRepository paymentTypeRepository, IEventRepository eventRepository, IBranchPreferenceService branchPreferenceService, IImagesStorage imagesStorage)
        {
            _transactionRepository = transactionRepository;
            _paymentTypeRepository = paymentTypeRepository;
            _eventRepository = eventRepository;
            _branchPreferenceService = branchPreferenceService;
            _imagesStorage = imagesStorage;    
            _imagesStorage.SetBucket("transaction");
        }


        public void Add(ClientTransaction transaction)
        {
            if(string.IsNullOrWhiteSpace(transaction.ImageReference))
            {
                transaction.ImageReference = _imagesStorage.StoreImage(transaction.Id.ToString().EncodeAsBase32String(), transaction.ImageReference);
            }

            //si es una transacción que corresponde a un pedido (evento)
            Event transactionEvent;
            if (transaction.EventId != null)
            {
                transactionEvent = _eventRepository.GetById((long)transaction.EventId);
                //obtener el % de comisión de MyFoodApp de Branch Preferences
                if (transaction.PaymentTypeId > 0)
                {
                    transaction.PctMyFoodApp = _branchPreferenceService.GetBranchEventCommisionPct(transactionEvent.BranchId, transactionEvent.EventType.Id, transaction.PaymentTypeId) / 100;
                    transaction.MyFoodAppFeeAmount = transaction.PctMyFoodApp * transaction.Amount;                    
                }
            }

            //si es una transacción que corresponde a una reserva
            if (transaction.ReservationId != null)
            {
                //obtener la comisión por reserva de MyFoodApp de Branch Preferences
                transaction.MyFoodAppFeeAmount = _branchPreferenceService.GetBranchReservationCommisionAmount(transaction.Event.BranchId);
            }

            //calcular la comisión del procesador de pago
            if (transaction.PaymentTypeId > 0)
            {
                var pt = _paymentTypeRepository.GetByKey(transaction.PaymentTypeId);
                decimal pctprocessor = pt.ProcessingPercentageFee / 100;
                transaction.PaymentProcessorFeeAmount = pctprocessor * transaction.Amount;
            }
            _transactionRepository.Create(transaction);
        }

        public void Delete(long id) => _transactionRepository.DeleteByKey(id);

        public ClientTransaction Get(long id) => _transactionRepository.GetByKey(id);

        public ICollection<ClientTransaction> GetAll() => _transactionRepository.GetAll();

        public ClientTransaction GetByEventId(long eventId)
        {
            var transaction = _transactionRepository.GetByEventId(eventId);
            if (transaction != null)
            {
                transaction.ImageReference = _imagesStorage.GetImage(transaction.Id.ToString().EncodeAsBase32String());
            }
            return transaction;
        }

        public IEnumerable<ClientTransaction> GetTransactionsByBranchId(int branchId)
        {
            return _transactionRepository.GetTransactionsByBranchId(branchId);
        }

        public ICollection<ClientTransaction> GetTransactionsByBranchIdAndDate()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ClientTransaction> GetTransactionsByBranchIdAndDate(long id, string startrange, string endrange)
        {
            throw new System.NotImplementedException();
        }

        public void Update(ClientTransaction transaction)
        {
            transaction.ImageReference = _imagesStorage.StoreImage(transaction.Id.ToString().EncodeAsBase32String(), transaction.ImageReference);
            transaction.MyFoodAppFeeAmount = transaction.PctMyFoodApp * transaction.Amount;
            if (transaction.PaymentType != null)
            {
                decimal pctprocessor = transaction.PaymentType.ProcessingPercentageFee;
                transaction.PaymentProcessorFeeAmount = pctprocessor * transaction.Amount;
            }
            _transactionRepository.Update(transaction);
        }
    }
}