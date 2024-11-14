import getGroupOrderViewAPI from "@/services/api/groupOrderViewAPI";
import { uiStore } from "@/stores/stores";
import { APPLICATION_VIEWS } from "@/constants/applicationConstants";
import { ref } from 'vue';

export class OrderListStoreModel {
    constructor() {
        this.init();
        this.fetchOrders =  ref([]);
    }

    init() {
        this.orderId = "";
        this.orderStatus = "";
        this.selectedOrderItemId = null;
    }

    setActiveView() {
        uiStore.setActiveView(APPLICATION_VIEWS.GROUP_ORDERS_VIEW);
    }

    async getAllGroupOrders() { 
        this.fetchOrders =  ref([]); // reset fetchOrders when click on the order menu again
        this.setActiveView();
        try {
            const response = await getGroupOrderViewAPI.getGroupOrder();
            console.log("---------------------------getGroupOrder***--------------" + response.data);
            
            response.data.forEach(groupOrder => {
                this.fetchOrders.push({
                    orderTime: groupOrder.orderTime,
                    orderStatus: groupOrder.orderStatus,
                    groupFoodOrderId: groupOrder.groupFoodOrderId,
                    location : groupOrder.location,
                    deliveryLocation: groupOrder.deliveryLocation,
                    deliveryLatitude: groupOrder.deliveryLatitude,
                    deliveryLongitude: groupOrder.deliveryLongitude,
                    rating : groupOrder.rating,
                    imgUrl : groupOrder.imgUrl
                });
                // console.log("groupOrder.groupFoodOrderId :===" + groupOrder.groupFoodOrderId);
            }); 
            console.log(this.fetchOrders);
        } catch (error) {
            return alert(error);
        }

    }

    async getOrdersForRestaurantStaff(userId) { 
        this.fetchOrders =  ref([]); // reset fetchOrders when click on the order menu again
        uiStore.setActiveView(APPLICATION_VIEWS.RESTAURANT_VIEW);
        //TODO: Temporary Hardcode restaurantId first
        // const userId = '7ea42f2f-2c01-4ce2-9444-6bf011d28009';
        const restaurantId = '5b75eb9f-fb89-45a2-94da-afbe6c21ff9c';
        try {
            const response = await getGroupOrderViewAPI.getOrdersForRestaurantStaff(userId, restaurantId);
            console.log("---------------------------getOrdersForRestaurantStaff***--------------" + response.data);
            
            response.data.forEach(groupOrder => {
                this.fetchOrders.push({
                    orderTime: groupOrder.orderTime,
                    orderStatus: groupOrder.orderStatus,
                    groupFoodOrderId: groupOrder.groupFoodOrderId,
                    location : groupOrder.location,
                    rating : groupOrder.rating,
                    imgUrl : groupOrder.imgUrl
                });
                // console.log("groupOrder.groupFoodOrderId :===" + groupOrder.groupFoodOrderId);
            }); 
            console.log(this.fetchOrders);
        } catch (error) {
            return alert(error);
        }

    }

    async getOrdersForDeliveryStaff(userId, location) { 
        this.fetchOrders =  ref([]); // reset fetchOrders when click on the order menu again
        uiStore.setActiveView(APPLICATION_VIEWS.DELIVERY_VIEW);
        try {
            console.log(userId);
            console.log(location);
            const response = await getGroupOrderViewAPI.getOrdersForDeliveryStaff(userId, location);
            console.log("---------------------------getOrdersForDeliveryStaff***--------------" + response.data);
            
            response.data.forEach(groupOrder => {
                this.fetchOrders.push({
                    orderTime: groupOrder.orderTime,
                    orderStatus: groupOrder.orderStatus,
                    groupFoodOrderId: groupOrder.groupFoodOrderId,
                    location : groupOrder.location,
                    rating : groupOrder.rating,
                    imgUrl : groupOrder.imgUrl
                });
                // console.log("groupOrder.groupFoodOrderId :===" + groupOrder.groupFoodOrderId);
            }); 
            console.log(this.fetchOrders);
        } catch (error) {
            return alert(error);
        }

    }

}
 

