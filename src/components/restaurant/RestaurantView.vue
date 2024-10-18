<template>
    <div class="group-orders">
        <h1>Select Restaurant to process orders</h1>
        <select v-model="selectedRestaurant" @change="refreshOrders">
            <option v-for="restaurant in restaurants" :value="restaurant" :key="restaurant.id">
                {{ restaurant.name }}
            </option>
        </select>
      <button title="Refresh to process orders!" @click="refreshOrders">
        <i class="fas fa-sync-alt"></i>
      </button>
        <div class="orders-container">
            <div v-if="filteredGroupOrders.length === 0">
                <div class="order-content">No orders available yet as of {{ currentTime }}</div>
            </div>
            <div v-for="order in filteredGroupOrders" :key="order.groupFoodOrderId" class="order-card">
                <header class="order-header">
                    <h2>Order #{{ order.groupFoodOrderId }}</h2>
                </header>
                <div class="order-content">
                    <p><strong>Restaurant Id:</strong> {{ order.restaurantId }}</p>
                    <p><strong>Restaurant:</strong> {{ order.restaurantName }}</p>
                    <img :src="order.imgUrl" alt="Restaurant Image" class="restaurant-image" />
                    <p><strong>Location:</strong> {{ order.location }}</p>
                    <p><strong>Rating:</strong> {{ order.rating }}</p>
                    <p><strong>Order Time:</strong> {{ new Date(order.orderTime).toLocaleString() }}</p>
                    <p class="status"><strong>Status:</strong> {{ order.orderStatus }}</p>
                </div>
                <footer class="order-footer">
                    <button class="status-button" v-if="order.orderStatus === 'SUBMITTED_TO_RESTAURANT'"
                        @click="updateStatusToKitchenPreparing(order.groupFoodOrderId)">
                        Start Preparing
                    </button>
                    <button class="status-ready-button" v-if="order.orderStatus === 'KITCHEN_PREPARING'"
                        @click="updateStatusToReadyForDelivery(order.groupFoodOrderId)">
                        Food Ready
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from 'vue';
import { RestaurantViewComposition } from "@/components/restaurant/RestaurantViewComposition";

const restaurants = reactive([
    { id: '6711074323ad9d42043cff5a', name: 'Malay Delight' },
    { id: '6711074323ad9d42043cff5e', name: 'Dumpling House' },
    { id: '6711074323ad9d42043cff63', name: 'Thai Spice' },
    { id: '6711074323ad9d42043cff65', name: 'Eastern Tandoori Palace' },
    { id: '6711074323ad9d42043cff67', name: 'West Tempura House' },
]);


const composition = new RestaurantViewComposition();
const selectedRestaurant = ref(restaurants[0]); // default to first restaurant
const currentTime = ref(new Date().toLocaleString()); // Initialize currentTime as a reactive ref

// Fetch orders when the component is mounted
onMounted(() => {
    refreshOrders();
});

watch(selectedRestaurant, (newVal) => {
    console.log('Selected Restaurant:', newVal);
    composition.selectedRestaurant = newVal;
});

function refreshOrders() {
    console.log('Fetching orders for:', selectedRestaurant.value.id);
    composition.fetchOrderForRestaurantStaff(selectedRestaurant.value.id, selectedRestaurant.value.name);
    currentTime.value = new Date().toLocaleString(); // Update the currentTime each time orders are refreshed

}

const { filteredGroupOrders } = composition;

function updateStatusToReadyForDelivery(groupFoodOrderId) {
    composition.updateStatusToReadyForDelivery(groupFoodOrderId);
    alert(`Update order ID: ${groupFoodOrderId} status to READY_FOR_DELIVERY`);
    composition.fetchOrderForRestaurantStaff(selectedRestaurant.value.id, selectedRestaurant.value.name);
}

function updateStatusToKitchenPreparing(groupFoodOrderId) {
    composition.updateStatusToKitchenPreparing(groupFoodOrderId);
    alert(`Update order ID: ${groupFoodOrderId} status to KITCHEN_PREPARING`);
    composition.fetchOrderForRestaurantStaff(selectedRestaurant.value.id, selectedRestaurant.value.name);
}


</script>

<style scoped lang="scss" src="./RestaurantView.scss"></style>
