using Google;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Storage.v1.Data;
using Google.Cloud.Storage.V1;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace MyFoodApp.API.GoogleStorage
{
    public class ImagesStorage: IImagesStorage
    {
        private readonly string _projectId;
        private readonly StorageClient _storageClient;
        private string _bucketName;
        private readonly string _storageNameSpace;
        private readonly string _urlRootStorage;

        public ImagesStorage(IConfiguration configuration)
        {
            _projectId = configuration["GoogleStorage:ProjectId"];
            _storageNameSpace = configuration["GoogleStorage:StorageNamespace"];
            _urlRootStorage = configuration["GoogleStorage:UrlRootStorage"];
            var googleCredential = GoogleCredential.FromFile(configuration["GoogleStorage:ConfigurationFile"]);
            _storageClient = StorageClient.Create(googleCredential);
        }

        public void SetBucket(string bucketName)
        {
            _bucketName = $"{_storageNameSpace}-{bucketName}";
            try
            {
                var bucket =_storageClient.GetBucket(_bucketName);

            }
            catch(HttpRequestException ex)
            {

            }
            catch(GoogleApiException ex) 
            when (ex.HttpStatusCode == HttpStatusCode.NotFound){
                var bucket =_storageClient.CreateBucket(_projectId, _bucketName);
                BucketAccessControl acl=new BucketAccessControl { Bucket=_bucketName,
                    Entity= "allUsers",
                    Role="READER"
                };
                var acls = new BucketAccessControls();
                acls.Items=new List<BucketAccessControl> { acl };
            }
        }
        public string StoreImage(string name, string imageDataUrl)
        {
            if (string.IsNullOrWhiteSpace(imageDataUrl))
            {
                return string.Empty;
            }
            var base64Data = Regex.Match(imageDataUrl, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            if (string.IsNullOrWhiteSpace(base64Data))
            {
                return imageDataUrl;
            }
            var binData = Convert.FromBase64String(base64Data);

            var imageCloud = _storageClient.UploadObject(_bucketName, $"{name}.jpg", "image/jpeg", new MemoryStream(binData),new UploadObjectOptions {
            PredefinedAcl=PredefinedObjectAcl.PublicRead
            });
            return imageCloud.MediaLink;
        }

        public string GetImage(string name)
        {
            try
            {
                return $"{_urlRootStorage}/{_bucketName }/{name}.jpg?version={new Random().Next()}";
            }
            catch (GoogleApiException ex) when (ex.HttpStatusCode == HttpStatusCode.NotFound)
            {
                return string.Empty;
            }
        }
    }
}
