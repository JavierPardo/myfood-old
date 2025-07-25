using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class BranchDateScheduleDto
    {
        public int BranchId { get; set; }
        public string Service { get; set; } //Pedido o Reserva
        public DateTime Date { get; set; }
        public bool IsClosed { get; set; } //si IsClosed=1, no hay atención y las horas estarán en blanco
        public TimeSpan TimeStart1 { get; set; }
        public TimeSpan? TimeStart2 { get; set; }
        public TimeSpan? TimeStart3 { get; set; }
        public TimeSpan TimeEnd1 { get; set; }
        public TimeSpan? TimeEnd2 { get; set; }
        public TimeSpan? TimeEnd3 { get; set; }
    }


}
