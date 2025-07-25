using Newtonsoft.Json.Linq;
using System;
using System.Buffers;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Infrastructure.JsonConverters
{
    public class JsonObjectConverter<TBackEnd,TFrontEnd> : JsonConverter<TBackEnd>
    {
        public override TBackEnd Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            try
            {
                if (typeof(TBackEnd) == typeof(byte[]) && typeof(TFrontEnd) == typeof(string))
                {
                    return (TBackEnd)Convert.ChangeType(Encoding.ASCII.GetBytes(reader.GetString()), typeof(TBackEnd));
                }
                if (typeof(TBackEnd) == typeof(decimal?) && typeof(TFrontEnd) == typeof(string))
                {
                    return (TBackEnd)(object)decimal.Parse(reader.GetString().Replace(',', '.'), CultureInfo.InvariantCulture);
                }

                if (typeof(TBackEnd) == typeof(string) && typeof(TFrontEnd) == typeof(Newtonsoft.Json.Linq.JObject))
                {
                    using (var jsonDoc = JsonDocument.ParseValue(ref reader))
                    {
                        return (TBackEnd)(object)jsonDoc.RootElement.GetRawText();                        
                    }
                }
                if (typeof(TBackEnd) == typeof(decimal) && typeof(TFrontEnd) == typeof(string))
                {
                    return (TBackEnd)(object)decimal.Parse(reader.GetString().Replace(',','.'), CultureInfo.InvariantCulture);
                    //return (TBackEnd)Convert.ChangeType(Encoding.ASCII.GetBytes(reader.GetString()), typeof(TBackEnd));
                }
                return (TBackEnd)Convert.ChangeType(reader.GetString(), typeof(TBackEnd));
            }
            catch
            {
                return default(TBackEnd);
            }
        }

        public override void Write(Utf8JsonWriter writer, TBackEnd value, JsonSerializerOptions options)
        {
            object retValue = default(TBackEnd);
            try
            {
                if (typeof(TBackEnd) == typeof(byte[]) && typeof(TFrontEnd) == typeof(string))
                {
                    retValue = Encoding.ASCII.GetString((byte[])Convert.ChangeType(value, typeof(TBackEnd)));
                }  else {
                    retValue = (TFrontEnd)Convert.ChangeType(value, typeof(TFrontEnd));
                }
            }
            catch
            {

            }
            writer.WriteStringValue(retValue.ToString());
        }
    }
}
