using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class SocialLoginService:ISocialLoginService
    {
        private readonly IHttpClientFactory _clientFactory;

        public SocialLoginService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;

        }

        public string GetEmailByFacebookToken(string token)
        {
            string url = $"https://graph.facebook.com/v8.0/me?fields=id,name,email&access_token={token}";
            var myReq = (HttpWebRequest)WebRequest.Create(url);
            myReq.ContentType = "application/json";
            myReq.Method = "GET";
            try
            {
                var resp = myReq.GetResponse();
                using (JsonReader reader = new JsonTextReader(new StreamReader(resp.GetResponseStream())))
                {
                    var fbUserAccount = new Newtonsoft.Json.JsonSerializer().Deserialize<JObject>(reader);
                    return fbUserAccount["email"].Value<string>();
                }
            }
            catch (Exception ex)
            {
            }
            return string.Empty;
        }

        public string GetEmailByGmailToken(string token)
        {
            string url = $"https://oauth2.googleapis.com/tokeninfo?id_token={token}";
            var myReq = (HttpWebRequest)WebRequest.Create(url);
            myReq.ContentType = "application/json";
            myReq.Method = "GET";
            try
            {
                var resp = myReq.GetResponse();
                using (JsonReader reader = new JsonTextReader(new StreamReader(resp.GetResponseStream())))
                {
                    var googleUserAccount = new Newtonsoft.Json.JsonSerializer().Deserialize<JObject>(reader);
                    return googleUserAccount["email"].Value<string>();
                }
            }
            catch (Exception ex)
            {
            }
            return string.Empty;
        }
    }
}
