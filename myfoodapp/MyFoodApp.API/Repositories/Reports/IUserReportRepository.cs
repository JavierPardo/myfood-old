using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;

namespace MyFoodApp.API.Interfaces
{
    public interface IUserReportRepository : IEntityModelRepository<User,long>
    {
        IEnumerable<UsersByZoneAndDateDto> GetUsersByZoneAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<UsersByGenderAndDateDto> GetUsersByGenderAndDate(DateTime fromDate, DateTime toDate, int BranchId);
        IEnumerable<UsersByAgeAndDateDto> GetUsersByAgeAndDate(DateTime fromDate, DateTime toDate, int BranchId);
    }
}
