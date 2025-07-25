using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using MyFoodApp.Resources;

namespace MyFoodApp.API.Helpers
{

    public class CustomIdentityErrorDescriber : IdentityErrorDescriber
    {
        private readonly IStringLocalizer<SharedResource> _sharedLocalizer;
        public CustomIdentityErrorDescriber(IStringLocalizer<SharedResource> sharedLocalizer)
        {
            _sharedLocalizer = sharedLocalizer;
        }
        public override IdentityError DefaultError() { return new IdentityError { Code = nameof(DefaultError), Description = _sharedLocalizer[nameof(DefaultError)] }; }
        //public override IdentityError ConcurrencyFailure() { return new IdentityError { Code = nameof(ConcurrencyFailure), Description = _sharedLocalizer[nameof(ConcurrencyFailure)] }; }
        public override IdentityError PasswordMismatch() { return new IdentityError { Code = nameof(PasswordMismatch), Description = _sharedLocalizer[nameof(PasswordMismatch)] }; }
        public override IdentityError InvalidToken() { return new IdentityError { Code = nameof(InvalidToken), Description = _sharedLocalizer[nameof(InvalidToken)] }; }
        //public override IdentityError LoginAlreadyAssociated() { return new IdentityError { Code = nameof(LoginAlreadyAssociated), Description = _sharedLocalizer[nameof(LoginAlreadyAssociated)] }; }
        public override IdentityError InvalidUserName(string userName) { return new IdentityError { Code = nameof(InvalidUserName), Description = String.Format(_sharedLocalizer[nameof(InvalidUserName)], userName) }; }
        public override IdentityError InvalidEmail(string email) { return new IdentityError { Code = nameof(InvalidEmail), Description = String.Format(_sharedLocalizer[nameof(InvalidEmail)], email) }; }
        public override IdentityError DuplicateUserName(string userName) { return new IdentityError { Code = nameof(DuplicateUserName), Description = String.Format(_sharedLocalizer[nameof(DuplicateUserName)], userName) }; }
        public override IdentityError DuplicateEmail(string email) { return new IdentityError { Code = nameof(DuplicateEmail), Description = String.Format(_sharedLocalizer[nameof(DuplicateEmail)], email) }; }
        //public override IdentityError InvalidRoleName(string role) { return new IdentityError { Code = nameof(InvalidRoleName), Description = String.Format(_sharedLocalizer[nameof(InvalidRoleName)], role) }; }
        //public override IdentityError DuplicateRoleName(string role) { return new IdentityError { Code = nameof(DuplicateRoleName), Description = String.Format(_sharedLocalizer[nameof(DuplicateRoleName)], role) }; }
        //public override IdentityError UserAlreadyHasPassword() { return new IdentityError { Code = nameof(UserAlreadyHasPassword), Description = _sharedLocalizer[nameof(UserAlreadyHasPassword)] }; }
        public override IdentityError UserLockoutNotEnabled() { return new IdentityError { Code = nameof(UserLockoutNotEnabled), Description = _sharedLocalizer[nameof(UserLockoutNotEnabled)] }; }
        public override IdentityError UserAlreadyInRole(string role) { return new IdentityError { Code = nameof(UserAlreadyInRole), Description = String.Format(_sharedLocalizer[nameof(UserAlreadyInRole)], role) }; }
        public override IdentityError UserNotInRole(string role) { return new IdentityError { Code = nameof(UserNotInRole), Description = String.Format(_sharedLocalizer[nameof(UserNotInRole)], role) }; }
        public override IdentityError PasswordTooShort(int length) { return new IdentityError { Code = nameof(PasswordTooShort), Description = String.Format(_sharedLocalizer[nameof(PasswordTooShort)], length) }; }
        public override IdentityError PasswordRequiresNonAlphanumeric() { return new IdentityError { Code = nameof(PasswordRequiresNonAlphanumeric), Description = _sharedLocalizer[nameof(PasswordRequiresNonAlphanumeric)] }; }
        public override IdentityError PasswordRequiresDigit() { return new IdentityError { Code = nameof(PasswordRequiresDigit), Description = _sharedLocalizer[nameof(PasswordRequiresDigit)] }; }
        public override IdentityError PasswordRequiresLower() { return new IdentityError { Code = nameof(PasswordRequiresLower), Description = _sharedLocalizer[nameof(PasswordRequiresLower)] }; }
        public override IdentityError PasswordRequiresUpper() { return new IdentityError { Code = nameof(PasswordRequiresUpper), Description = _sharedLocalizer[nameof(PasswordRequiresUpper)] }; }
    }
}