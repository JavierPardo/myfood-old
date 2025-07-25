namespace MyFoodApp.API.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string JwtKey { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtExpireDays { get; set; }
    }
}