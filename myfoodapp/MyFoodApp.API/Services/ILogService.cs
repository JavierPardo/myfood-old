using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Interfaces
{
    public interface ILogService
    {
        (bool isFile, object content) GetPath(string path);
    }
}
