
using MyFoodApp.API.Entities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.DTO
{
    public class DeliveryRequestDto 
    {
        public string ToPhoneNumber { get; set; }
        public int BranchId { get; set; }
        public long EventId { get; set; }
        public int EventTypeId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string BranchCoordinates { get; set; }
        public string BranchAddressUrl
        {
            get
            {
                if (BranchCoordinates == null)
                    return "";
                var coordinates = JObject.Parse(BranchCoordinates);
                string lat = coordinates["lat"].Value<string>();
                string lng = coordinates["lng"].Value<string>();
                return "https://www.google.com/maps/@?api=1&map_action=map&center=" + lat + "," + lng;
            }
        }
        public string BranchWhatsapp { get; set; }
        public string BranchWhatsappUrl
        {
            get
            {
                return "https://wa.me/" + BranchWhatsapp;
            }
        }
        public int PaymentTypeId { get; set; }
        public string PaymentTypeName { get; set; }
        public string AppUserFullName { get; set; }
        public string AppUserWhatsapp { get; set; }
        public string AppUserWhatsappUrl
        {
            get
            {
                return "https://wa.me/" + AppUserWhatsapp;
            }
        }
        public decimal OrderAmount { get; set; }
        public string LocationAddress { get; set; }
        public string LocationAddressNotes { get; set; }
        public string LocationCoordinates { get; set; }
        public string LocationAddressUrl
        {
            get
            {
                if (LocationCoordinates == null)
                    return "";
                return "https://www.google.com/maps/@?api=1&map_action=map&center=" + LocationCoordinates;
            }
        }
        public decimal DeliveryDistance { get; set; }
        public decimal DeliveryCost { get; set; }
        public decimal TotalAmount
        {
            get
            {
                return OrderAmount + DeliveryCost;
            }
        }
    }
}
