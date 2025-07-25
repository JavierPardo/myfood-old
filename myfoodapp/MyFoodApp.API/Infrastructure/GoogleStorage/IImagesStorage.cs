using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.GoogleStorage
{
    public interface IImagesStorage
    {
        string StoreImage(string name, string imageDataUrl);
        void SetBucket(string bucketName);
        string GetImage(string name);
    }
}
