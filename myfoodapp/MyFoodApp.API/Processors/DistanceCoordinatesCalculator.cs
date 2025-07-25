using Microsoft.Extensions.Logging;
using MyFoodApp.API.Infrastructure.Exception;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MyFoodApp.API.Processors
{
    public class DistanceCoordinatesCalculator : IDistanceCoordinatesCalculator
    {
        private readonly ILogger<DistanceCoordinatesCalculator> _logger;

        public DistanceCoordinatesCalculator(ILogger<DistanceCoordinatesCalculator> logger)
        {
            _logger = logger;
        }
        public decimal CalculateDistance(string originCoordinates, string destinyLat, string destinyLng)
        {
            var coordinates = JObject.Parse(originCoordinates);
            var requestUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?units=meters&origins={coordinates["lat"].Value<string>()},{coordinates["lng"].Value<string>()}&destinations={destinyLat},{destinyLng}&key=AIzaSyDsjF-dIJaYor2HCgbyq-b-Tk0MC88C134";
            var webClient = new WebClient();
            var response = System.Text.Encoding.Default.GetString(webClient.DownloadData(requestUrl));
            _logger.LogInformation($"Google Distance Matrix response:{response}");

            JObject json = JObject.Parse(response);
            if (json["status"].Value<string>() != "OK" || json["status"].Value<string>() != "OK")
            {
                _logger.LogInformation($"Google Distance matrix invalid:{response}");
                throw new MyFoodApp.API.Infrastructure.Exception.ApiException(HttpStatusCode.BadRequest, "Invalid distance");
            }
            return (decimal)(json["rows"].Values<JObject>().First()["elements"].Values<JObject>().First()["distance"]["value"].Value<decimal>() / 1000);

        }
        public decimal CalculateDistance(string originCoordinates, string destinyCoordinates)
        {
            var coordinates = JObject.Parse(destinyCoordinates);
            var lat = coordinates["lat"].Value<string>();
            var lng = coordinates["lng"].Value<string>();
            return CalculateDistance(originCoordinates, lat, lng);
        }
    }
}
