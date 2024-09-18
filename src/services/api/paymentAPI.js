import Api from "@/services/api/baseAPI";

const PAYMENT = '/order-service/UpdatePaymentStatusAPI/updatePayment';

export default {
    updatePaymentStatus: (paymentDetails) => Api().put(PAYMENT, paymentDetails)
};

//atodo Need previous to post orderitemid to backend updatepaymentstatus
//change to put?