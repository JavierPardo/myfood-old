using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Extension
{
    public static class Enumerables
    {
        public static void ForEach<T>(this IEnumerable<T> @this, Action<T> action)
        {
            if (@this == null)
                return;
            foreach (T item in @this)
            {
                action(item);
            }
        }
    }
}
