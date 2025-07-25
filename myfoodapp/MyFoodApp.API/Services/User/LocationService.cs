using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Exception;
using MyFoodApp.API.Processors;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace MyFoodApp.API.Services
{
    public class LocationService : ILocationService
    {
        private readonly IDistanceCoordinatesCalculator _distanceCoordinatesCalculator;
        private readonly IUserSession _userSession;
        private readonly IBranchRepository _branchRepository;
        private readonly ILogisticProviderRateRepository _logisticProviderRateRepository;
        private readonly ILogger<LocationService> _logger;
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository,
            ILogisticProviderRateRepository logisticProviderRateRepository,
            IBranchRepository branchRepository,
            IUserSession userSession,
            IDistanceCoordinatesCalculator distanceCoordinatesCalculator,
            ILogger<LocationService> logger)
        {
            _distanceCoordinatesCalculator = distanceCoordinatesCalculator;
            _userSession = userSession;
            _branchRepository = branchRepository;
            _logisticProviderRateRepository = logisticProviderRateRepository;
            _logger = logger;
            _locationRepository = locationRepository;
        }
        public void Add(Location location)
        {
            location.UserId = _userSession.GetUserId();
            _locationRepository.Create(location);
        }

        public void Delete(long id) => _locationRepository.DeleteByKey(id);

        public Location Get(long id) => _locationRepository.GetByKey(id);

        public ICollection<Location> GetAll() => _locationRepository.GetAll();

        public IEnumerable<Location> GetLocationsByUserId(long userId)
        {
            return _locationRepository.GetLocationsByUserId(userId);
        }


        public object GetDeliveryDetails(string lat, string lng)
        {
            var currentBranch = _branchRepository.GetByKey(_userSession.BranchId);
            if (currentBranch.Coordinates == null|| currentBranch.Coordinates == "null")
            {
                throw new ApiException(HttpStatusCode.BadRequest, "Branch coordinates required");
            }


            var actualDistance = _distanceCoordinatesCalculator.CalculateDistance(currentBranch.Coordinates, lat, lng);
            var providerRate = _logisticProviderRateRepository.GetByDistance(actualDistance, _userSession.BranchId);

            if (providerRate == null)
            {
                throw new ApiException(HttpStatusCode.BadRequest, "There was a problem with the Logistic Provider configuration.");
            }

            return new 
            {
                DeliveryDistanceKm = actualDistance,
                DeliveryCost = providerRate.Fee
            };
        }

        public void Update(Location location)
        {
            location.UserId = _userSession.GetUserId();
            _locationRepository.Update(location);
        }

        public IEnumerable<Location> GetByUserId()
        {
            var userId = _userSession.GetUserId();
            return GetLocationsByUserId(userId);
        }
    }
}
