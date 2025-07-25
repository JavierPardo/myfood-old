using MyFoodApp.API.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyFoodApp.API.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "fnameRequired")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "lnameRequired")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "emailRequired")]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }        
        public string Password { get; set; }
        public string UserName { get; set; }
        public bool CanDelete { get; set; }
        public string Preferences { get; set; }        
        public string Role { get; set; }
        [Required(ErrorMessage = "DOBRequired")]
        public DateTime DOB { get; set; }
        [Required(ErrorMessage = "genderRequired")]
        public GenderEnum Gender { get; set; }
        public bool CanEdit { get; set; }
    }
}