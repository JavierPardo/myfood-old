using System;
using System.Collections.Generic;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;

namespace MyFoodApp.API.Services
{
    public interface IClientTransactionReportService
    {
        public IEnumerable<ClientTransaction> GetClientTransactionsByDate(DateTime fromDate, DateTime toDate, bool withConciliation);
        public IEnumerable<ClientTransaction> GetClientTransactionsByDateClientOrBranch(DateTime fromDate, DateTime toDate);
    }
    public class ClientTransactionReportService : IClientTransactionReportService
    {
        private readonly IClientTransactionReportRepository _clientTransactionReportRepository;
        private readonly IUserSession _userSession;

        public ClientTransactionReportService(
            IClientTransactionReportRepository clientTransactionReportRepository,
            IUserSession userSession
            )
        {
            _clientTransactionReportRepository = clientTransactionReportRepository;
            _userSession = userSession;
        }

        public IEnumerable<ClientTransaction> GetClientTransactionsByDate(DateTime fromDate, DateTime toDate, bool withConciliation)
        {
            if(_userSession.BranchId > 0)
                return _clientTransactionReportRepository.GetClientTransactionsByDate(fromDate, toDate, withConciliation, _userSession.BranchId);
            return new List<ClientTransaction>();
        }

        public IEnumerable<ClientTransaction> GetClientTransactionsByDateClientOrBranch(DateTime fromDate, DateTime toDate)
        {
            if (_userSession.BranchId > 0 && _userSession.ClientId > 0)
                return _clientTransactionReportRepository.GetClientTransactionsByDateClientOrBranch(fromDate, toDate, _userSession.BranchId, _userSession.ClientId);
            return new List<ClientTransaction>();
        }
    }
}
