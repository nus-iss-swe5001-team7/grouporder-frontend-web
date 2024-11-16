// GroupOrderViewComposition.js
import { ref, computed } from 'vue';
import {cartStore, deliveryFeeStore, restaurantStore, uiStore, userStore} from '@/stores/stores';
import GroupOrderViewAPI from "@/services/api/groupOrderViewAPI.js";
import {APPLICATION_VIEWS, STEPS} from "@/constants/applicationConstants";

export class GroupOrderViewComposition {

    groupOrders = ref([]);
    selectedStatus = ref('');
    selectedLocation = ref('');
    selectedRating = ref('');

    constructor() {
        this.fetchAllGroupOrders();
        this.customerLocation = ref('');
    }

    async fetchAllGroupOrders() {
        try {
            const userID = userStore.getUserId();
            console.log(userID);
            const response = await GroupOrderViewAPI.getAllPendingJoinGroupOrders(userID);
            if (response.status === 200) {
                this.groupOrders.value = response.data;
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
            const ratingMatch = this.selectedRating.value ? order.rating === this.selectedRating.value : true;
            const deliveryLocationMatch = this.customerLocation.value ? order.deliveryLocation === this.customerLocation.value : true;
            return statusMatch && locationMatch && ratingMatch && deliveryLocationMatch;
        });
    });

    joinGroupOrder(orderId) {
      this.setSelectedRestaurant(orderId);
    }

    refreshGroupOrder() {
        this.fetchAllGroupOrders();
    }

    async setSelectedRestaurant(orderId) {
        try {
            const response = await GroupOrderViewAPI.getInfoForGroupOrder(orderId);
            if (response.status === 200) {
                restaurantStore.setSelectedRestaurantId(response.data.restaurantId);
                uiStore.setActiveView(APPLICATION_VIEWS.CUSTOMER_VIEW);
                uiStore.setCurrentStep(STEPS.MENU);
                cartStore.init();
                uiStore.jointGroupOrderId = orderId;
                userStore.customerLocation = response.data.deliveryLocation;
                userStore.customerAddress = response.data.deliveryAddress;
                deliveryFeeStore.numberOfUsers = response.data.numberOfUsers;
                deliveryFeeStore.deliveryFee = response.data.groupOrderDeliveryFee / (deliveryFeeStore.numberOfUsers + 1);
            } else {
                console.error(`Received unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error getSelectedRestaurant', error);
        }
    }

}
