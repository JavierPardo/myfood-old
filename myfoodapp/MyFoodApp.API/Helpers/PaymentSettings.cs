namespace MyFoodApp.API.Helpers
{
    public class PaymentSettings
    {        
        public string AppKey { get; set; }
        public string AuthorizePaymentAsyncURL { get; set; }
        public string Token { get; set; }
        public string PaymentProcessor { get; set; }
    }
}