import {reactive} from "vue";
import {UsersStoreModel} from "@/stores/models/UsersStoreModel";
import {UiStoreModel} from "@/stores/models/UiStoreModel";
import {RestaurantStoreModel} from "@/stores/models/RestaurantStoreModel";
import {MenuStoreModel} from "@/stores/models/MenuStoreModel";
import {OrderStoreModel} from "@/stores/models/OrderStoreModel";
import {OrderListStoreModel} from "@/stores/models/OrderListStoreModel";
import {CartStoreModel} from "@/stores/models/CartStoreModel";
import {PaymentStoreModel} from "@/stores/models/PaymentStoreModel";
import {DeliveryFeeStoreModel} from "@/stores/deliveryFee/DeliveryFeeStoreModel";

// Only a single instance of each store should exist, and the store must be reactive to trigger Vue updates.
// We may need to introduce more fine-grained reactivity in the future, only making specific objects in the stores reactive, depending on performance.
const userStore = reactive(new UsersStoreModel());

const uiStore = reactive(new UiStoreModel());

const restaurantStore = reactive(new RestaurantStoreModel());

const menuStore = reactive(new MenuStoreModel());

const orderStore = reactive(new OrderStoreModel());

const orderListStore = reactive(new OrderListStoreModel());

const cartStore = reactive(new CartStoreModel());

const paymentStore = reactive(new PaymentStoreModel());

const deliveryFeeStore = reactive(new DeliveryFeeStoreModel());

export {
    userStore,
    uiStore,
    restaurantStore,
    menuStore,
    orderStore,
    orderListStore,
    cartStore,
    paymentStore,
    deliveryFeeStore
};
