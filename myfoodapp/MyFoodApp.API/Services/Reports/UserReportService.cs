using System;
using System.Collections.Generic;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IUserReportService
    {
        public IEnumerable<UsersByZoneAndDateDto> GetUsersByZoneAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<UsersByGenderAndDateDto> GetUsersByGenderAndDate(DateTime fromDate, DateTime toDate);
        public IEnumerable<UsersByAgeAndDateDto> GetUsersByAgeAndDate(DateTime fromDate, DateTime toDate);
    }

    public class UserReportService : IUserReportService
    {
        private readonly IUserReportRepository _userReportRepository;
        private readonly IUserSession _userSession;

        public UserReportService(
            IUserReportRepository userReportRepository,
            IUserSession userSession
            )
        {
            _userReportRepository = userReportRepository;
            _userSession = userSession;
        }

        public IEnumerable<UsersByZoneAndDateDto> GetUsersByZoneAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _userReportRepository.GetUsersByZoneAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<UsersByZoneAndDateDto>();
        }

        public IEnumerable<UsersByGenderAndDateDto> GetUsersByGenderAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _userReportRepository.GetUsersByGenderAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<UsersByGenderAndDateDto>();
        }

        public IEnumerable<UsersByAgeAndDateDto> GetUsersByAgeAndDate(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0)
                return _userReportRepository.GetUsersByAgeAndDate(fromDate, toDate, _userSession.BranchId);
            return new List<UsersByAgeAndDateDto>();
        }
    }
}
