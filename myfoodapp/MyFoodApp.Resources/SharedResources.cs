using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Localization;


namespace MyFoodApp.Resources
{
    public interface ISharedResource
    {
    }
    public class SharedResource : ISharedResource
    {
        private readonly IStringLocalizer _localizer;

        public SharedResource(IStringLocalizer<SharedResource> localizer)
        {
            _localizer = localizer;
        }
        public string this[string index]
        {
            get
            {
                return _localizer[index];
            }
        }
    }
}
