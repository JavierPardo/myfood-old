using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace MyFoodApp.API.Entities
{
    public class Invoice
    {
        public long Id { get; set; }
        public string InvoiceNumber { get; set; }
        public string CustomerName { get; set; }
        public string TaxId { get; set; }
        public decimal Amount { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string ControlNumber { get; set; }
        public string Notes { get; set; }
        public long TransactionId { get; set; }
        public virtual ClientTransaction Transaction { get; set; }
    }
    public class InvoiceEntityConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            //Transaction - Invoice (one-to-zero-or-one)
            builder
                .HasKey(e => e.TransactionId);
            builder
                .HasOne(e => e.Transaction)
                .WithOne(a => a.Invoice)
                .HasForeignKey<Invoice>(a => a.TransactionId);
        }
    }
}
