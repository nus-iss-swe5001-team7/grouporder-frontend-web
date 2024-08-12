// RestaurantViewComposition.js
import { ref, computed } from 'vue';
import { userStore, orderStore } from '@/stores/stores';

import GroupOrderViewAPI from "@/services/api/groupOrderViewAPI.js";

export class RestaurantViewComposition {

    groupOrders = ref([]);
    selectedRestaurant = ref('');

    constructor() {

    }

    async fetchOrderForRestaurantStaff(restaurantId, restaurantName) {
        this.groupOrders.value = [];
        try {
            const response = await GroupOrderViewAPI.getOrdersForRestaurantStaff(userStore.getUserId(), restaurantId);
            if (response.status === 200) {
                this.groupOrders.value = response.data;
                if (response.data.length === 0) {
                    console.log("No order available for the selected restaurant: " + restaurantName);
                }
            } else {
                console.error(`Received unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching group orders:', error);
        }
    }

    filteredGroupOrders = computed(() => {
        return this.groupOrders.value.filter(order => {
            const restaurantMatch = this.selectedRestaurant.value ? order.restaurantId === this.selectedRestaurant.value : true;
            return restaurantMatch;
        });
    });

    async updateStatusToReadyForDelivery(orderId) {
        console.log(orderId);
        console.log("async updateStatusToReadyForDelivery");
        orderStore.updateStatusToReadyForDelivery(orderId);
    }

    async updateStatusToKitchenPreparing(orderId) {
        console.log(orderId);
        console.log("async updateStatusToKitchenPreparing");
        orderStore.updateStatusToKitchenPreparing(orderId);
    }


}