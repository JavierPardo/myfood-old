namespace MyFoodApp.API.Helpers
{
    public class SmtpSettings
    {        
        public string RecoveryPasswordAccount { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }  
    }
}