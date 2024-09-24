import {computed, ref} from "vue";
import PaymentAPI from "@/services/api/paymentAPI.js";
import {deliveryFeeStore, orderListStore, userStore} from '@/stores/stores';
import {orderStore, cartStore} from "@/stores/stores";
import {restaurantStore} from "@/stores/stores"; //nick test. want to comment
import {uiStore} from "@/stores/stores"; //nick test. want to comment
import {STEPS} from "@/constants/applicationConstants"; //nick test. want to comment
import {paymentStore} from "@/stores/stores";

export class PaymentViewComposition {

    constructor() {
        this.creditCardNumber = ref('');
        this.expiryDate = ref('');
        this.cvv = ref('');
        this.paymentSuccessful = ref(false);
        this.test = ref("testing");
        this.validCreditCardNumber = ref(false);
        this.validCVV = ref(false);
        this.validDate = ref(false);
        this.isGroupFoodOrder = ref(true);
        this.usePromo = ref(false);
        this.forShow = ref(false);
        this.validNumber = ref(false);
        this.totalPrice = ref();
        this.selectedPaymentOption = ref('creditCard'); // Initialize selected payment option to credit card
        this.payNowMobileNumber = ref('');
        this.payLahMobileNumber = ref('');
        this.isInfoProvided = computed(() => this.checkInfoProvided());
        // alway false for this page, since need to move promo calculation to summary page
        // to reduce major refactoring!!!
    }

    validateNumber() {
        const singaporePhoneNumberRegex = /^(?:\+?65)?[689]\d{7}$/;

        this.validNumber.value = singaporePhoneNumberRegex.test(this.payNowMobileNumber.value) || singaporePhoneNumberRegex.test(this.payLahMobileNumber.value);
    }

    // https://stackoverflow.com/questions/26436414/regular-expressions-for-16-digits-and-forward-slash
    validateCCNum() {
        this.validCreditCardNumber.value = /^\d{16}$/.test(this.creditCardNumber.value);
        // console.log(this.validCreditCardNumber.value)
    }

    validateDate() {
        this.validDate.value = /^\d{2}\/\d{2}$/.test(this.expiryDate.value);
    }

    validateCVV() {
        this.validCVV.value = /^\d{3}$/.test(this.cvv.value);
    }

    checkInfoProvided() {
        if (this.selectedPaymentOption.value === 'payLah') {
            return this.payLahMobileNumber.value !== '' && this.validNumber.value;
        } else if (this.selectedPaymentOption.value === 'payNow') {
            return this.payNowMobileNumber.value !== '' && this.validNumber.value;
        } else {
            return this.validCreditCardNumber.value && this.validDate.value && this.validCVV.value;
        }
    }

    async makePayment() {
        // updatePaymentStatus: (paymentDetails) => Api().post(PAYMENT, paymentDetails)
        try {
            // send `order_item_id`s and `user_id` to backend
            var orderItemId = orderStore.getSelectedOrderItemId();
            // getPromoStatus
            // if true, getDiscountedTotalPrice
            // paymentStore.getPromoStatus();
            // cartStore.getDiscountedTotalPrice();
            console.log(`paymentStore.getPromoStatus() ${paymentStore.getPromoStatus()}`);
            if (paymentStore.getPromoStatus()) {
                this.totalPrice.value = cartStore.getDiscountedTotalPrice();
                console.log(`discounted price: ${this.totalPrice.value}`);
            } else {
                this.totalPrice.value = cartStore.getTotalPrice();
                console.log(`No discount price: ${this.totalPrice.value}`);
            }

            var paymentDetails = {
                "orderItemId": orderItemId,
                "paymentStatus": "PENDING",
                "isGroupFoodOrder": this.isGroupFoodOrder,
                "isGetPromo": this.usePromo,
                "totalPrice": this.totalPrice.value,
                "forShow": this.forShow,
                "paymentType": this.selectedPaymentOption,
                "creditCardNumber": this.creditCardNumber.value,
                "expiryDate": this.expiryDate.value,
                "cvv": this.cvv.value,
                "payNowMobileNumber": this.payNowMobileNumber.value,
                "payLahMobileNumber": this.payLahMobileNumber.value
            };
            console.log(`This totalPrice: ${this.totalPrice.value}`);
            console.log(`isGroupFoodOrder ${this.isGroupFoodOrder.value}`)
            console.log(`usePromo ${this.usePromo.value}`)
            console.log(`Selected Payment Option: ${this.selectedPaymentOption.value}`)
            PaymentAPI.updatePaymentStatus(paymentDetails).then(res => {
                if (res.status == 200) {
                    // console.log(res);
                    reset();   //nick test. want to comment
                    alert("Payment successful! Click to proceed!"); // Show "payment successful" pop-up message
                    orderStore.getGroupOrdersByUserId(userStore.userId);
                    paymentStore.setPromoStatus(false);
                    // error.response?.data?.err_message)
                }
            }).catch(error => {
                reset();
                //alert(error.response.data);
                console.error(error);
                paymentStore.paymentRequired = false;
                paymentStore.paymentPending = false;
                orderListStore.getAllGroupOrders();
            });

        } catch (err) {
            console.error(err);
        }
    }

}

function reset() {
    cartStore.init();
    restaurantStore.setSelectedRestaurantId(null);
    paymentStore.paymentPending = false;
    paymentStore.paymentRequired = false;
    userStore.customerLocation = '';
    uiStore.setCurrentStep(STEPS.RESTAURANT);
    deliveryFeeStore.init();
    uiStore.jointGroupOrderId = null;
}


