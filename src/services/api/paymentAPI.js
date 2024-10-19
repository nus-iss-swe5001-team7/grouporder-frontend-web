import Api from "@/services/api/baseAPI";

const PAYMENT = '/UpdatePaymentStatusAPI/updatePayment';

export default {
    updatePaymentStatus: (paymentDetails) => Api().put(PAYMENT, paymentDetails)
};
