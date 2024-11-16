import {cartStore, deliveryFeeStore, menuStore, orderStore, restaurantStore, uiStore, userStore} from "@/stores/stores";
import {computed, ref, watch} from "vue";
import {OrderModel} from "@/entity/OrderModel";
import {STEPS} from "@/constants/applicationConstants";
import PaymentAPI from "@/services/api/paymentAPI.js";

import {paymentStore} from "@/stores/stores";
import L from 'leaflet';

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
                this.moveMapToRegion(location); // Move the map but don't set the selected location
            }
        });

        this.unitNumber = ref(''); // New ref for the unit number
        this.customerAddress = ref(''); // Add this to hold the address
        this.deliveryLatitude = ref(null);
        this.deliveryLongitude = ref(null);

        this.regionCoordinates = {
            "North": [1.445, 103.825],   // Example coordinates for the North region
            "West": [1.352, 103.680],    // Example coordinates for the West region
            "South": [1.273, 103.840],   // Example coordinates for the South region
            "East": [1.320, 103.930],    // Example coordinates for the East region
            "Central": [1.364, 103.833]  // Example coordinates for the Central region
        };

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

    initMap() {
        // Create the map and set its initial view
        this.map = L.map('map').setView([1.3521, 103.8198], 13); // Default to Singapore coordinates

        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Custom emoji icon using DivIcon
        const emojiIcon = L.divIcon({
            html: '📍',
            className: 'emoji-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Add a marker when the user clicks on the map to select a location
        this.map.on('click', async (e) => {
            const { lat, lng } = e.latlng;

            // Remove the previous marker if it exists
            if (this.marker) {
                this.map.removeLayer(this.marker);
            }

            // Add a new marker with the emoji icon
            this.marker = L.marker([lat, lng], { icon: emojiIcon }).addTo(this.map);

            // Set latitude and longitude refs
            this.deliveryLatitude.value = lat;
            this.deliveryLongitude.value = lng;

            // Fetch the address using a geocoding API
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                const data = await response.json();
                if (data && data.display_name) {
                    this.customerAddress.value = data.display_name; // Set the selected address
                } else {
                    console.error('Address not found');
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        });
    }


    moveMapToRegion(region) {
        if (region && this.regionCoordinates[region]) {
            const [lat, lng] = this.regionCoordinates[region];
            this.map.setView([lat, lng], 13); // Adjust the zoom level as needed
        }
    }

    async fetchAddress(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.display_name) {
                this.customerAddress.value = data.display_name;
            } else {
                console.error('Address not found');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    }


    sendOrder() {
        if (userStore.customerLocation !== "" && this.customerAddress.value !== '') {
            const order = new OrderModel();
            order.userId = userStore.getUserId();
            order.restaurantId = restaurantStore.getSelectedRestaurantId();
            order.orderDetails = JSON.stringify(this.cartItems.value);
            order.location = this.customerLocation.value;
            order.deliveryAddress = `${this.unitNumber.value}  ${this.customerAddress.value}`;
            console.log(this.unitNumber.value);
            order.deliveryLatitude = this.deliveryLatitude.value;
            console.log(this.deliveryLatitude.value);
            order.deliveryLongitude = this.deliveryLongitude.value;
            console.log(this.deliveryLongitude.value);
            order.deliveryFee = this.deliveryFee.value;
            orderStore.sendOrder(order);
            uiStore.setCurrentStep(STEPS.PAYMENT);
            userStore.customerLocation = '';
            this.customerAddress.value = ''; // Reset after sending
            this.unitNumber.value = ''; // Reset unit number after sending
            paymentStore.paymentPending = true;
        } else {
            alert("Please select your delivery location and enter your address!")
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

