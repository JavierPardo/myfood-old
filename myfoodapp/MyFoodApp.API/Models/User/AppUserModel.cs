using MyFoodApp.API.Enum;
using System;

namespace MyFoodApp.API.Models
{
  public class AppUserModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Preferences { get; set; }
        public bool CanDelete { get; set; }
        public DateTime DOB { get; set; }
        public GenderEnum Gender { get; set; }
    }
}