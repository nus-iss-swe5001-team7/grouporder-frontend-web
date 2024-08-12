export class PaymentStoreModel {
    constructor() {
        this.paymentRequired = false;
        this.orderItemId = "";
        this.promoStatus = false;
        this.paymentPending = false;
    }

    setPaymentRequired(value, orderItemId) {
        this.paymentRequired = value;
        this.orderItemId = orderItemId;
    }

    //need add orderItemId?
    getPaymentRequired() {
        return this.paymentRequired;
    }

    setPromoStatus(status) {
        this.promoStatus = status;
    }

    getPromoStatus() {
        return this.promoStatus;
    }

}

