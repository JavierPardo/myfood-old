using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderService
    {
        void Add(OrderDto order);
        Order Add(Order order);
        void Update(long id,OrderDto order);
        OrderDto Get(long id);
        IEnumerable<Order> GetAll();
        void Delete(long id);
        IEnumerable<Order> GetOrdersByEventId(long eventId);
        IEnumerable<Order> GetOrdersByBranchId(int branchId);
        IEnumerable<Order> GetAllByEventId(long eventId, string statuses);
        IEnumerable<Order> GetByDateAndStatus(IEnumerable<int> statusIds, DateTime orderDate, IEnumerable<int> eventTypeIds);
        Order UpdateStatus(long orderId, int status);

        Task<MessageResource> SendLogisticRequestMessage(long id);
    }
}
