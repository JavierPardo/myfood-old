using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class OperationalsDetailByDateReportDto
    {
        public IEnumerable<OperationalDetailByDateReportDto> OperationalsDetailByDateReport { get; set; }
        public double? AvgResponseTimeBs { get; set; }
    }
}