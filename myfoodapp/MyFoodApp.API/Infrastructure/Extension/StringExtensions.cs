using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.Extension
{
    public static class StringExtensions
    {
        /// <summary>
        /// The different characters allowed in Base32 encoding.
        /// </summary>
        /// <remarks>
        /// This is a 32-character subset of the twenty-six letters A–Z and six digits 2–7.
        /// <see cref="https://en.wikipedia.org/wiki/Base32" />
        /// </remarks>
        private const string Base32AllowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        //private const string CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";


        public static string ToBase32String(this byte[] input, bool addPadding = true)
        {
            if (input == null || input.Length == 0)
            {
                return string.Empty;
            }

            var bits = input.Select(b => Convert.ToString(b, 2).PadLeft(8, '0')).Aggregate((a, b) => a + b).PadRight((int)(Math.Ceiling((input.Length * 8) / 5d) * 5), '0');
            var result = Enumerable.Range(0, bits.Length / 5).Select(i => Base32AllowedCharacters.Substring(Convert.ToInt32(bits.Substring(i * 5, 5), 2), 1)).Aggregate((a, b) => a + b);
            if (addPadding)
            {
                result = result.PadRight((int)(Math.Ceiling(result.Length / 8d) * 8), '=');
            }
            return result;
        }

        public static string EncodeAsBase32String(this object inputString)
        {
            return inputString.EncodeAsBase32String(false);
        }
        public static string EncodeAsBase32String(this object inputString, bool addPadding)
        {
            string toEncode = inputString.ToString();
            if (string.IsNullOrEmpty(toEncode))
            {
                return string.Empty;
            }

            var bytes = Encoding.UTF8.GetBytes(toEncode);
            var result = bytes.ToBase32String(addPadding);
            return result;
        }

        public static T DecodeFromBase32String<T>(this string input)
        {
            try
            {
                if (string.IsNullOrEmpty(input))
                {
                    return default(T);
                }

                var bytes = input.ToUpper().ToByteArray();
                var result = Encoding.UTF8.GetString(bytes);
                Type t = Nullable.GetUnderlyingType(typeof(T)) ?? typeof(T);

                return (T)Convert.ChangeType(result, t);
            }
            catch
            { 
                return default(T); 
            }

        }

        /// <summary>
        /// Converts a Base32 string into the corresponding byte array, using 5 bits per character.
        /// </summary>
        /// <param name="input">The Base32 String</param>
        /// <returns>A byte array containing the properly encoded bytes.</returns>
        public static byte[] ToByteArray(this string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return new byte[0];
            }

            var bits = input.TrimEnd('=').ToCharArray().Select(c => Convert.ToString(Base32AllowedCharacters.IndexOf(c), 2).PadLeft(5, '0')).Aggregate((a, b) => a + b);
            var result = Enumerable.Range(0, bits.Length / 8).Select(i => Convert.ToByte(bits.Substring(i * 8, 8), 2)).ToArray();
            return result;
        }
    }
}