import Api from "@/services/api/baseAPI";

const PAYMENT = '/order-service/UpdatePaymentStatusAPI/updatePayment';

export default {
    updatePaymentStatus: (paymentDetails) => Api().put(PAYMENT, paymentDetails)
};
