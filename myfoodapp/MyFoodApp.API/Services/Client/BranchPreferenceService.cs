using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class BranchPreferenceService : IBranchPreferenceService
    {
        private readonly IBranchPreferenceHistoryRepository _branchPreferenceHistoryRepository;
        private readonly IUserSession _userSession;
        private readonly IBranchPreferenceRepository _branchRepository;

        public BranchPreferenceService(IBranchPreferenceRepository branchRepository,
            IUserSession userSession,
            IBranchPreferenceHistoryRepository branchPreferenceHistoryRepository)
        {
            _branchPreferenceHistoryRepository = branchPreferenceHistoryRepository;
            _userSession = userSession;
            _branchRepository = branchRepository;
        }
        public void Add(BranchPreferences client)
        {
            _branchRepository.Create(client);
        }

        public void Delete(int id) => _branchRepository.DeleteByKey(id);

        public BranchPreferences Get(int id) => _branchRepository.GetByKey(id);
        public BranchPreferences GetByBranchIdAndName(int branchId, string name) => _branchRepository.GetByBranchIdAndName(branchId, name);
        public decimal GetBranchEventCommisionPct (int branchId, int eventTypeId, int paymentTypeId)
            //solo para pedidos (pickup, delivery, camarero virtual)
        {
            BranchPreferences branchPreference;
            decimal pct = 0;
            //el nombre de la preferencia es "Comision.TipoPedido.TipoPago"
            string name = "Comision.";
            switch (eventTypeId)  //tipo de pedido
            {
                case (int)EventTypeEnum.DeliveryOrder:
                    name += "Delivery";
                    break;
                case (int)EventTypeEnum.PickUpOrder:
                    name += "Pickup";
                    break;
                case (int)EventTypeEnum.VirtualWaiter:
                    name += "Camarero";
                    break;
            }

            switch (paymentTypeId)
            {
                case (int)PaymentTypeEnum.Cash:
                    name += "Efectivo";
                    break;
                case (int)PaymentTypeEnum.Online:
                    name += "Procesador";
                    break;
            }

            branchPreference = GetByBranchIdAndName(branchId, name);
            if (branchPreference != null)
                Decimal.TryParse(branchPreference.PreferenceValue, out pct);
            return pct;
        }

        public decimal GetBranchReservationCommisionAmount(int branchId)
        //solo para reservas
        {
            BranchPreferences branchPreference;
            decimal fee = 0;
            //el nombre de la preferencia es "Comision.Reservas.CobroUnitario"
            string name = "Comision.Reservas.CobroUnitario";

            branchPreference = GetByBranchIdAndName(branchId, name);
            if (branchPreference != null)
                Decimal.TryParse(branchPreference.PreferenceValue, out fee);
            return fee;
        }

        public IEnumerable<BranchPreferences> GetByBranchId(int branchId) => _branchRepository.GetByBranchId(branchId);

        public void Update(BranchPreferences branchPreference)
        {
            var brancPref = _branchRepository.GetByBranchIdAndName(_userSession.BranchId, branchPreference.PreferenceName);
            if(brancPref.SuperAdminOnly&& !_userSession.UserRol.Contains("Super Admin"))
            {
                return;
            }
            var oldBranchPreference = JsonConvert.SerializeObject(brancPref);
            brancPref.PreferenceValue = branchPreference.PreferenceValue;
            _branchRepository.Update(brancPref);
            var newBranchPreference = JsonConvert.SerializeObject(brancPref);
            _branchPreferenceHistoryRepository.Create(new BranchPreferenceHistory
            {
                ModifiedBy = _userSession.GetUserId(),
                ModifiedDate = DateTime.Now,
                Current = newBranchPreference,
                Old = oldBranchPreference
            });
        }

        public IEnumerable<BranchPreferences> GetAll()
        {
            return _branchRepository.GetAll().OrderBy(x=>x.PreferenceName);
        }
    }
}
