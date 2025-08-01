﻿using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IOrderItemSelectedSideRepository : IEntityModelRepository<OrderItemSelectedSides, long>
    {
        IEnumerable<OrderItemSelectedSides> GetAllByOrderId(long orderId);
        IEnumerable<OrderItemSelectedSides> GetAllByEventId(long eventId);
    }
}
