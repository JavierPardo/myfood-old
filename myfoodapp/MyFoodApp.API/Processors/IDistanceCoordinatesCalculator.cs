using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Processors
{
    public interface IDistanceCoordinatesCalculator
    {
        decimal CalculateDistance(string originCoordinates, string destinyCoordinates);
        decimal CalculateDistance(string originCoordinates, string destinyLat, string destinyLng);
    }
}
