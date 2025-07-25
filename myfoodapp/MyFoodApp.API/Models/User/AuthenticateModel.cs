using System.ComponentModel.DataAnnotations;

namespace MyFoodApp.API.Models
{
    public class AuthenticateModel
    {
        [Required(ErrorMessage = "emailRequired")]
        public string Email { get; set; }

        [Required(ErrorMessage = "passwordRequired")]
        public string Password { get; set; }
    }
}