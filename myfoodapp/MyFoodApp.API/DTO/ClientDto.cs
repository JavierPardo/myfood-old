using MyFoodApp.API.Infrastructure.Extension;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyFoodApp.API.DTO
{
    public class ClientDto : IValidatableObject
    {
        [Required]
        public string Name { get; set; }
        public bool IsActive { get; set; }
        [JsonIgnore]
        public int Id { get; set; }

        [JsonPropertyName("id")]
        public string EncrytedId
        {
            get
            {
                return Id.EncodeAsBase32String();
            }
            set
            {
                Id = value.DecodeFromBase32String<int>();
            }
        }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Name)||Name.StartsWith("N"))
            {
                yield return new ValidationResult("Name is invalid", new[] { "Name" });
            }
        }
    }
}
