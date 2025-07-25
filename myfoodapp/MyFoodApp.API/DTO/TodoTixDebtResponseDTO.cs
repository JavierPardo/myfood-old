using System.Collections.Generic;

namespace MyFoodApp.API.DTO
{
    public class TodoTixDebtResponseDTO
    {
        [Newtonsoft.Json.JsonProperty("error")]
        public int ErrorCode { get; set; }

        [Newtonsoft.Json.JsonProperty("existente")]
        public int Existing { get; set; }

        [Newtonsoft.Json.JsonProperty("mensaje")]
        public string Message { get; set; }

        [Newtonsoft.Json.JsonProperty("id_transaccion")]
        public string TransactionId { get; set; }

        [Newtonsoft.Json.JsonProperty("url_pasarela_pagos")]
        public string Url { get; set; }

        [Newtonsoft.Json.JsonProperty("datos")]
        public object Data { get; set; }
        
    }    
}
