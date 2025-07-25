using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.JsonConverters
{
    public class JsonEncrypterConverter<TBackEnd> : JsonConverter<TBackEnd>
    {
        public override TBackEnd Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            try
            {
                return reader.GetString().DecodeFromBase32String<TBackEnd>();
            }
            catch
            {
                return default(TBackEnd);
            }
        }

        public override void Write(Utf8JsonWriter writer, TBackEnd value, JsonSerializerOptions options)
        {

            writer.WriteStringValue(value.ToString().EncodeAsBase32String());
        }
    }
}
