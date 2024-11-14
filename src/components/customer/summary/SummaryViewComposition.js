import {cartStore, deliveryFeeStore, menuStore, orderStore, restaurantStore, uiStore, userStore} from "@/stores/stores";
import {computed, ref, watch} from "vue";
import {OrderModel} from "@/entity/OrderModel";
import {STEPS} from "@/constants/applicationConstants";
import PaymentAPI from "@/services/api/paymentAPI.js";

import {paymentStore} from "@/stores/stores";

export class SummaryViewComposition {

    constructor() {

        this.cartItems = computed(() => cartStore.getCart());
        this.jointOrder = computed(() => uiStore.jointGroupOrderId !== null);
        this.totalPrice = computed(() => cartStore.getTotalPrice());

        watch(this.cartItems, () => this.calculatePrice(), {deep: true});

        // promo checks
        // alway true for `forShow` and `isGroupFoodOrder` on this page, since need to move promo calculation to summary page
        // to reduce major refactoring!!!
        this.promoStatus = computed({
            get: () => cartStore.promoStatus,
            set: (promoStatus) => {
                cartStore.promoStatus = promoStatus;
            }
        });
        this.isGroupFoodOrder = ref(true);
        this.forShow = ref(true);
        this.finalPromoPrice = ref(null);

        this.showCart = computed(() => cartStore.showCart);

        this.promoType = ref(null);

        this.customerLocation = computed({
            get: () => userStore.customerLocation,
            set: (location) => {
                userStore.customerLocation = location;
            }
        });
        this.deliveryFee = computed(() => deliveryFeeStore.deliveryFee);

        watch(this.customerLocation, (customerLocation) => deliveryFeeStore.calculateDeliveryFee(customerLocation));
    }

    formatPreferenceType(preferenceType) {
        return preferenceType
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    formatOption(option) {
        return option.charAt(0).toUpperCase() + option.slice(1).toLowerCase();
    }

    checkDeliveryLocation() {
        return this.cartItems.value.length > 0 && uiStore.jointGroupOrderId === null;
    }

    showDeliveryLocation() {
        return uiStore.jointGroupOrderId !== null && cartStore.showCart;
    }

    removeItem(items) {
        cartStore.removeItem(items.menuId, items.preferences);
    }

    addItem(items) {
        cartStore.addItem(items.menuId, items.preferences);
    }

    calculatePrice() {
        this.cartItems.value.forEach(cartItem => {
            cartItem.price = cartItem.quantity * this.getUnitPrice(cartItem.menuId);
        });
        cartStore.setCart(this.cartItems.value);
    }

    async togglePromo() {
        console.log(this.promoStatus.value);
        await this.calculatePromoPrice();
    }

    async calculatePromoPrice() {

        console.log(cartStore.getTotalPrice());
        console.log(this.promoStatus.value);
        if (this.promoStatus.value) {
            // call backend
            try {
                // in order not to do major refactoring
                // use dummy orderItemId here!
                // var paymentDetails =        {
                //         "orderItemId": "aaaa1111-1111-1111-1111-111111111111",
                //         "paymentStatus": "PENDING",
                //         "isGroupFoodOrder": this.isGroupFoodOrder,
                //         "isGetPromo": this.promoStatus,
                //         "totalPrice": cartStore.getTotalPrice(),
                //         "forShow": this.forShow
                //     };
                var paymentDetails =        {
                    "orderItemId": "aaaa1111-1111-1111-1111-111111111111",
                    "paymentStatus": "PENDING",
                    "isGroupFoodOrder": this.isGroupFoodOrder.value,
                    "isGetPromo": this.promoStatus.value,
                    "totalPrice": this.totalPrice.value,
                    "forShow": this.forShow.value,
                    "paymentType": "creditCard",
                    "creditCardNumber": "1234",
                    "expiryDate": "11/11",
                    "cvv": "123",
                    "payNowMobileNumber": "12341234",
                    "payLahMobileNumber": "12341234"
                };
                // console.log(`This totalPrice: ${this.totalPrice.value}`);
                console.log(`isGroupFoodOrder ${this.isGroupFoodOrder.value}`)
                console.log(`promoStatus ${this.promoStatus.value}`)
                console.log(paymentDetails);
                const res = await PaymentAPI.updatePaymentStatus(paymentDetails);
                const response_json = await res.data; // axios syntax
                if (res.status == 200) {
                    console.log(response_json)

                    let parts = response_json.split(' ');
                    console.log(parts[0]);
                    console.log(parts[1]);

                    this.finalPromoPrice.value = parts[0];
                    this.promoType.value = parts[1];

                    paymentStore.setPromoStatus(true);
                    cartStore.setDiscountedTotalPrice(this.finalPromoPrice.value);
                    console.log(`cartStore discounted price: ${cartStore.getDiscountedTotalPrice()}`);

                    // also hold this afterPromoPrice value
                    // onClick sendOrder(), THEN UPDATE the cart totalPrice to this afterPromoPrice

                }else if (res.status == 401) {

                    console.log(`${res.status}`);
                }else {
                    console.log(`Other status_code received: ${res.status}`);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    getUnitPrice(itemId) {
        return menuStore.getUnitPrice(itemId);
    }

    sendOrder() {
        if (userStore.customerLocation !== "") {
            const order = new OrderModel();
            order.userId = userStore.getUserId();
            order.restaurantId = restaurantStore.getSelectedRestaurantId();
            order.orderDetails = JSON.stringify(this.cartItems.value);
            order.location = this.customerLocation.value;
            order.deliveryFee = this.deliveryFee.value;
            orderStore.sendOrder(order);
            uiStore.setCurrentStep(STEPS.PAYMENT);
            userStore.customerLocation = '';
            paymentStore.paymentPending = true;
        } else {
            alert("Please select your delivery location!")
        }
    }

    joinOrder() {
        const order = new OrderModel();
        order.userId = userStore.getUserId();
        order.restaurantId = restaurantStore.getSelectedRestaurantId();
        order.orderDetails = JSON.stringify(this.cartItems.value);
        order.location = this.customerLocation.value;
        order.groupFoodOrderId = uiStore.jointGroupOrderId;
        order.deliveryFee = deliveryFeeStore.deliveryFee;
        orderStore.sendOrder(order);
        uiStore.setCurrentStep(STEPS.PAYMENT);
        paymentStore.paymentPending = true;
    }

    undo() {
        cartStore.undo();
    }

    startOrder() {
        uiStore.setCurrentStep(STEPS.RESTAURANT);
    }

    cancel() {
        uiStore.jointGroupOrderId = null;
        cartStore.init();
        userStore.customerLocation = '';
        deliveryFeeStore.init();
        restaurantStore.selectedRestaurantId = null;
        uiStore.setCurrentStep(STEPS.RESTAURANT);
    }
}

