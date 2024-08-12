// DeliveryViewComposition.js
import { ref, computed } from 'vue';
import { userStore, orderStore } from '@/stores/stores';
import { uiStore } from "@/stores/stores";
import { APPLICATION_VIEWS } from "@/constants/applicationConstants";

import GroupOrderViewAPI from "@/services/api/groupOrderViewAPI.js";

export class DeliveryViewComposition {

    groupOrders = ref([]);
    selectedStatus = ref('');
    selectedLocation = ref('');

    constructor() {
        this.getOrdersForDeliveryStaff(this.selectedLocation);
    }

    async getOrdersForDeliveryStaff(location) {
        this.groupOrders.value = [];
        try {
            const userID = userStore.getUserId();
            console.log(userID);
            console.log(location);
            console.log("async getOrdersForDeliveryStaff");
            uiStore.setActiveView(APPLICATION_VIEWS.DELIVERY_VIEW);

            const response = await GroupOrderViewAPI.getOrdersForDeliveryStaff(userID, location);
            if (response.status === 200) {
                this.groupOrders.value = response.data;
                if (response.data.length === 0) {
                    console.log("No order available for the selected location: " + location);
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
            const statusMatch = this.selectedStatus.value ? order.orderStatus === this.selectedStatus.value : true;
            const locationMatch = this.selectedLocation.value ? order.location === this.selectedLocation.value : true;
            return statusMatch && locationMatch;
        });
    });

    async updateStatusToOnDelivery(orderId) {
        console.log(orderId);
        console.log("async updateStatusToOnDelivery");
        orderStore.updateStatusToOnDelivery(orderId);
    }

    async updateStatusToDelivered(orderId) {
        console.log(orderId);
        console.log("async updateStatusToDelivered");
        orderStore.updateStatusToDelivered(orderId);
    }


}