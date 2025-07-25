using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace MyFoodApp.API.Integrations
{
    public class TodotixService : ITodoTixService
    {
        private readonly HttpClient _client = new HttpClient();
        private readonly IMapper _mapper;
        private readonly PaymentSettings _paymentSettings;
        private readonly ITransactionService _transactionService;
        private readonly IConfiguration _configuration;
        private readonly IEventRepository _eventRepository;
        private readonly IReservationService _reservationService;
        private readonly IBranchService _branchService;

        public IUserRepository _userRepository { get; }

        public TodotixService(HttpClient client,
            IMapper mapper,
            IOptions<PaymentSettings> paymentSettings,
            ITransactionService transactionService,
            IUserRepository userRepository,
            IConfiguration configuration,
            IEventRepository eventRepository,
            IReservationService reservationService,
            IBranchService branchService)
        {
            _transactionService = transactionService;
            _configuration = configuration;
            _eventRepository = eventRepository;
            _reservationService = reservationService;
            _userRepository = userRepository;
            _branchService = branchService;
            _client = client;
            _mapper = mapper;
            _paymentSettings = paymentSettings.Value;
        }


        private async Task<string> CreateDebtAsync(DebtDTO model)
        {
            model.AppKey = _paymentSettings.AppKey;
            var registerDebtUrl = $"{_paymentSettings.PaymentProcessor}/rest/deuda/registrar";
            var response = await PostRequestAsync(model, registerDebtUrl);
            var responseString = await response.Content.ReadAsStringAsync();
            return responseString;
        }

        private async Task<bool> CheckPayment(string transactionId)
        {
            string appKey = _paymentSettings.AppKey;
            string url = $"{_paymentSettings.PaymentProcessor}/rest/deuda/consultar_pagos";
            string paymenyDateStart = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd");
            string paymenyDateEnd = DateTime.Now.ToString("yyyy-MM-dd");
            var checkPaymentDto = new CheckPaymentDTO() { appKey = appKey, fecha_inicial = paymenyDateStart, fecha_final = paymenyDateEnd };
            var response = await PostRequestAsync(checkPaymentDto, url);
            var responseString = await response.Content.ReadAsStringAsync();
            JObject res = JObject.Parse(responseString);
            var paymentData = res.SelectToken($"$.datos[?(@.id_transaccion == '{transactionId}')]");
            return paymentData != null;
        }


        public async Task<HttpResponseMessage> PostRequestAsync(Object paymentDTO, string url)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(
                    JsonConvert.SerializeObject(paymentDTO),
                    Encoding.UTF8,
                    "text/plain")
            };

            var response = _client.SendAsync(request).Result;
            response.EnsureSuccessStatusCode();
            return response;
        }
        public async Task<HttpResponseMessage> PostRequestAsync(Object paymentDTO, string url, string token)
        {
            _client.DefaultRequestHeaders.Clear();
            _client.DefaultRequestHeaders.Authorization
                         = new AuthenticationHeaderValue("Bearer", token);

            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(
                    JsonConvert.SerializeObject(paymentDTO),
                    Encoding.UTF8,
                    "text/plain"),

            };

            var response = _client.SendAsync(request).Result;
            response.EnsureSuccessStatusCode();
            return response;
        }

        public void SuccessfulPaymentNotification(int transactionID)
        {
            throw new NotImplementedException();
        }

        public async Task<string> CreateDebtAsyncByEventId(RegisterDebtDTO debtDTO)
        {
            string responseValue = string.Empty;
            var model = _eventRepository.GetCompleteById(debtDTO.EventId, true);
            var debtDetailLines = new List<DebtDetailLine>();

            if (model == null)
            {
                return responseValue;
            }
            //si es un pedido
            if (model.EventType != null && model.EventType.Id != (int)EventTypeEnum.Reservation && model.Orders != null)
            {
                //var order = model.Orders.FirstOrDefault(); 
                foreach (var order in model.Orders)
                {
                    if (order != null)
                    {
                        foreach (var orderItem in order.OrderItems)
                        {
                            var detailLine = new DebtDetailLine();
                            detailLine.Concept = orderItem.Item.Name;
                            detailLine.Quantity = orderItem.Quantity;
                            detailLine.UnitCost = orderItem.Price;
                            detailLine.ProductCode = orderItem.ItemId.ToString();
                            debtDetailLines.Add(detailLine);
                        }

                    }
                }
            }

            DebtDTO debt = new DebtDTO
            {
                BusinessName = _branchService.GetCurrent().BranchName,
                ClientName = model.AppUser.FirstName,
                ClientLastName = model.AppUser.LastName,
                ClientEmail = model.AppUser.Email,
                DocumentNumber = model.AppUser.PhoneNumber,
                //Id = transaction.Id.ToString(),
                Description = $"Orden #{model.Id}",
                DebtDetailLines = debtDetailLines,
                CallbackUrl = $"{_configuration["Server:FrontEndAdmin"]}/payment/event/{model.Id}"
            };
            //agregar delivery si aplica
            if (model.DeliveryCost > 0)
            {
                debt.DeliveryCost = (decimal)model.DeliveryCost;
            }

            responseValue = await CreateDebtAsync(debt);
            var response = JsonConvert.DeserializeObject<TodoTixDebtResponseDTO>(responseValue);
            ClientTransaction transaction = new ClientTransaction();
            if (response.ErrorCode == 0)
            {
                transaction.CurrentStatusId = 1;
                transaction.EventId = debtDTO.EventId;
                transaction.PaymentTypeId = (int)PaymentTypeEnum.Online;
                transaction.ProcessorDebtId = response.TransactionId;
                transaction.Amount = debt.TotalAmount;
                _transactionService.Add(transaction);
                debtDTO.CallBackUrl = response.Url;
            }
            else
            {
                transaction.CurrentStatusId = 4;
                transaction.EventId = debtDTO.EventId;
                transaction.PaymentTypeId = (int)PaymentTypeEnum.Online;
                transaction.Notes = "ERROR: " + response.Message;
                transaction.ProcessorDebtId = response.TransactionId;
                transaction.Amount = debt.TotalAmount;
                _transactionService.Add(transaction);
            }
            return responseValue;
        }

        public async void CreateDebtAsyncByReservationId(RegisterDebtDTO debtDTO)
        {
            Reservation reserv = await _reservationService.Get(debtDTO.ReservationId);
            var debtDetailLines = new List<DebtDetailLine>();

            //si es una reserva
            if (reserv.SpecialEvent != null)
            {
                var detailLine = new DebtDetailLine();
                detailLine.Concept = "Reserva " + reserv.Branch.Name + " " + string.Format("dd/MM/YYYY", reserv.ReservationDateTime);
                detailLine.Quantity = 1;
                detailLine.UnitCost = reserv.SpecialEvent.CurrentPrice;
                detailLine.ProductCode = "EVENTO" + reserv.SpecialEventId;
                debtDetailLines.Add(detailLine);
            }

            DebtDTO debt = new DebtDTO
            {
                BusinessName = _branchService.GetCurrent().BranchName,
                ClientName = reserv.User.FirstName,
                ClientLastName = reserv.User.LastName,
                ClientEmail = reserv.User.Email,
                DocumentNumber = reserv.User.PhoneNumber,
                //Id = transaction.Id.ToString(),
                Description = $"Reserva #{reserv.Id}",
                DebtDetailLines = debtDetailLines,
                CallbackUrl = $"{_configuration["Server:FrontEndAdmin"]}/payment/reservation/{reserv.Id}"
            };

            var responseValue = await CreateDebtAsync(debt);
            var response = JsonConvert.DeserializeObject<TodoTixDebtResponseDTO>(responseValue);
            ClientTransaction transaction = new ClientTransaction();
            if (response.ErrorCode == 0)
            {
                transaction.CurrentStatusId = 1;
                transaction.ReservationId = debtDTO.ReservationId;
                transaction.Reservation = reserv;
                transaction.PaymentTypeId = (int)PaymentTypeEnum.Online;
                transaction.ProcessorDebtId = response.TransactionId;
                transaction.Amount = debt.TotalAmount;
                _transactionService.Add(transaction);
                debtDTO.CallBackUrl = response.Url;
            }
            else
            {
                transaction.CurrentStatusId = 4;
                transaction.ReservationId = debtDTO.ReservationId;
                transaction.Reservation = reserv;
                transaction.PaymentTypeId = (int)PaymentTypeEnum.Online;
                transaction.Notes = "ERROR: " + response.Message;
                transaction.ProcessorDebtId = response.TransactionId;
                transaction.Amount = debt.TotalAmount;
                _transactionService.Add(transaction);
                debtDTO.CallBackUrl = response.Url;
            }
        }


        public void UpdatePaymentEvent(long eventId)
        {
            var transaction = _transactionService.GetByEventId(eventId);
            var isPaid = CheckPayment(transaction.ProcessorDebtId).Result;
            if (isPaid)
            {
                var @event = _eventRepository.GetById(eventId);
                @event.CurrentStatusId = 2;
                _eventRepository.Update(@event);
                transaction.Notes = "Todotix";
                transaction.CurrentStatusId = 2;
                _transactionService.Update(transaction);
            }
        }

    }


    public class PaymentDTO
    {
        public string appkey { get; set; }
        public string email_cliente { get; set; }
        public string identificador { get; set; }
        //public DateTime fecha_vencimiento { get; set; }
        public string descripcion { get; set; }
        public string callback_url { get; set; }
        public string nombre_cliente { get; set; }
        public string apellido_cliente { get; set; }
        public string numero_documento { get; set; }
        public string razón_social { get; set; }
        public string lineas_detalle_deuda { get; set; }
    }

    public class CheckPaymentDTO
    {
        public string appKey { get; set; }
        public string fecha_inicial { get; set; }
        public string fecha_final { get; set; }
    }
}
