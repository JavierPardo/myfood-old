using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.JsonConverters
{
    public class JsonTimeSpanConverter : JsonConverter<TimeSpan?>
    {
        public override TimeSpan? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            TimeSpan dt;
            if (!TimeSpan.TryParseExact(reader.GetString(), @"h\:mm\:ss\.fff", null, TimeSpanStyles.AssumeNegative, out dt))
            {
                return null;
            }
            return dt;
        }

        public override void Write(Utf8JsonWriter writer, TimeSpan? value, JsonSerializerOptions options)
        {
            if (value.HasValue)
                writer.WriteStringValue(value.Value.ToString(@"h\:mm\:ss\.fff"));
            else
                writer.WriteStringValue((string)null);
        }
    }
}
