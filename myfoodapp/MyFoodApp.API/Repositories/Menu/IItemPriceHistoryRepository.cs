﻿using MyFoodApp.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface IItemPriceHistoryRepository : IEntityModelRepository<ItemPriceHistory, long>
    {
        ItemPriceHistory GetPriceHistoryByItemId(long id);
        ItemPriceHistory GetLastPriceHistoryByItemId(long id);
    }
}
