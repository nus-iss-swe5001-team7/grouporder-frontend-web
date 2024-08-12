<template>
    <div class="delivery-orders">
        <h1>Select location for delivery</h1>
        <select v-model="selectedLocation" @change="refreshOrders">
            <option value="Central">Central</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="West">West</option>
            <option value="East">East</option>
        </select>
      <button title="Refresh to deliver orders!" @click="refreshOrders">
        <i class="fas fa-sync-alt"></i>
      </button>
        <div class="orders-container">
            <div v-if="filteredGroupOrders.length === 0">
                <div class="order-content">No orders available yet as of {{ currentTime }}, please select another
                    location and fetch order.</div>
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
                    <!-- This button will only show if the orderStatus is 'pending_user_to_join' -->
                    <button class="status-ready-button" v-if="order.orderStatus === 'ON_DELIVERY'"
                        @click="updateOrderDelivered(order.groupFoodOrderId)">
                        Complete Delivery
                    </button>
                    <button class="status-button" v-if="order.orderStatus === 'READY_FOR_DELIVERY'"
                        @click="updateOrderOnDelivery(order.groupFoodOrderId)">
                        Accept Delivery
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { DeliveryViewComposition } from "@/components/delivery/DeliveryViewComposition";

const composition = new DeliveryViewComposition();
const selectedLocation = ref('South');

const { filteredGroupOrders } = composition;
const currentTime = ref(new Date().toLocaleString()); // Initialize currentTime as a reactive ref

// Fetch orders when the component is mounted
onMounted(() => {
    refreshOrders();
});

function refreshOrders() {
    composition.getOrdersForDeliveryStaff(selectedLocation.value);  // Use the current selected location
    currentTime.value = new Date().toLocaleString(); // Update the currentTime each time orders are refreshed
}

function updateOrderDelivered(groupFoodOrderId) {
    composition.updateStatusToDelivered(groupFoodOrderId);
    alert(`Update order ID: ${groupFoodOrderId} status to DELIVERED`);
    composition.getOrdersForDeliveryStaff(selectedLocation.value);
}

function updateOrderOnDelivery(groupFoodOrderId) {
    composition.updateStatusToOnDelivery(groupFoodOrderId);
    alert(`Update order ID: ${groupFoodOrderId} status to ON_DELIVERY`);
    composition.getOrdersForDeliveryStaff(selectedLocation.value);
}

</script>

<style scoped lang="scss" src="./DeliveryView.scss"></style>
