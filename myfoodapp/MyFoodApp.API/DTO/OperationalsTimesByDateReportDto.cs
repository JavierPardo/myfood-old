using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class OperationalsTimesByDateReportDto
    {
        public IEnumerable<OperationalTimesByDateReportDto> OperationalsTimesByDateReport { get; set; }
        public double? AvgResponseTimeBs { get; set; }
        public double? AvgProcessOrderTimeBs { get; set; }
    }
}