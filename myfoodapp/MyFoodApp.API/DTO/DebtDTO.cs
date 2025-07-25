


using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.DTO
{
    public class DebtDTO
    {
        [Newtonsoft.Json.JsonProperty("appkey")]
        public string AppKey { get; set; }

        [Newtonsoft.Json.JsonProperty("email_cliente")]
        public string ClientEmail { get; set; }

        [Newtonsoft.Json.JsonProperty("identificador")]
        public string Id { get; set; }
        [Newtonsoft.Json.JsonProperty("callback_url")]
        public string CallbackUrl { get; set; }

        [Newtonsoft.Json.JsonProperty("descripcion")]
        public string Description { get; set; }

        [Newtonsoft.Json.JsonProperty("nombre_cliente")]
        public string ClientName { get; set; }

        [Newtonsoft.Json.JsonProperty("apellido_cliente")]
        public string ClientLastName { get; set; }

        [Newtonsoft.Json.JsonProperty("numero_documento")]
        public string DocumentNumber { get; set; }

        [Newtonsoft.Json.JsonProperty("razón_social")]
        public string BusinessName { get; set; }
        [Newtonsoft.Json.JsonProperty("valor_envio")]
        public decimal DeliveryCost { get; set; }

        [Newtonsoft.Json.JsonProperty("lineas_detalle_deuda")]
        public IEnumerable<DebtDetailLine> DebtDetailLines { get; set; }
        public decimal TotalAmount
        {
            get
            {
                return DebtDetailLines.Select(x => x.Quantity * x.UnitCost).Sum();
            }
        }
    }
    public class DebtDetailLine
    {
        [Newtonsoft.Json.JsonProperty("concepto")]
        public string Concept { get; set; }
        
        [Newtonsoft.Json.JsonProperty("cantidad")]
        public int Quantity { get; set; }

        [Newtonsoft.Json.JsonProperty("costo_unitario")]
        public decimal UnitCost { get; set; }
        
        [Newtonsoft.Json.JsonProperty("codigo_producto")]
        public string ProductCode { get; set; }

    }
}
