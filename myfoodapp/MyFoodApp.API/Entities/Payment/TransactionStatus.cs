using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyFoodApp.API.Infrastructure.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyFoodApp.API.Entities
{
    public class TransactionStatus
    {
        [JsonConverter(typeof(JsonEncrypterConverter<int>))]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<ClientTransaction> Transactions { get; set; }
    }
    public class TransactionStatusEntityConfiguration : IEntityTypeConfiguration<TransactionStatus>
    {
        public void Configure(EntityTypeBuilder<TransactionStatus> builder)
        {
            builder
                .HasMany(e => e.Transactions)
                .WithOne(e => e.TransactionStatus)
                .HasForeignKey(e => e.CurrentStatusId);
        }
    }
}