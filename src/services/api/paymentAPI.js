import Api from "@/services/api/baseAPI";

const PAYMENT = '/UpdatePaymentStatus/';

export default {
    updatePaymentStatus: (paymentDetails) => Api().put(PAYMENT, paymentDetails)
};

//atodo Need previous to post orderitemid to backend updatepaymentstatus
//change to put?