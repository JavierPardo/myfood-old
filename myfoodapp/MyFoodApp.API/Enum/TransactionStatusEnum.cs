using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Enum
{
    public enum TransactionStatusEnum : int
    {
        [Description("ENUM_TransactionStatus_Authorized")]
        Authorized =1,
        [Description("ENUM_TransactionStatus_PAYMENTPROCESSED")]
        PaymentProcessed =2,
        [Description("ENUM_TransactionStatus_AUTHORIZATIONCANCELLED")]
        AuthorizationCancelled = 3,
        [Description("ENUM_TransactionStatus_AUTHORIZARIONREJECTED")]
        AuthorizationRejected = 4,
        [Description("ENUM_TransactionStatus_CASHPAYMENT")]
        CashPayment =5,
        [Description("ENUM_TransactionStatus_CONCILIATE")]
        Conciliate = 6
    }
}
