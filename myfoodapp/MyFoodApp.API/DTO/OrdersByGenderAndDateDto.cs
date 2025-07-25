using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class OrdersByGenderAndDateDto
    {
        public long GenderId { get; set; }
        public int Amount { get; set; }
    }
}