using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class BranchSchedule
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public string Service { get; set; }  //"Pedido" o "Reserva"
        public DayOfWeek Day { get; set; }  //lunes-domingo. Si un dia no aparece aquí es porque no hay atención. Las fechas en BranchExceptionDate tienen prioridad.
        public TimeSpan TimeStart1 { get; set; }
        public TimeSpan? TimeStart2 { get; set; }
        public TimeSpan? TimeStart3 { get; set; }
        public TimeSpan TimeEnd1 { get; set; }
        public TimeSpan? TimeEnd2 { get; set; }
        public TimeSpan? TimeEnd3 { get; set; }
    }
}
