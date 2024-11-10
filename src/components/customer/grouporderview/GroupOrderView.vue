<template>
    <div class="group-orders">
        <h1>All Group Orders
          <button title="Refresh to get latest group orders!" @click="composition.refreshGroupOrder()">
            <i class="fas fa-sync-alt"></i>
          </button></h1>

      <div> Delivery Location:
        <select v-model="customerLocation" required>
          <option disabled value="">Select a location</option>
          <option v-for="(location, key) in Object.values(RESTAURANT_LOCATIONS)" :value="location.name" :key="key">
            {{ location.name }}</option>
        </select>
      </div>

      <div> Restaurants:
        <select v-model="selectedLocation">
          <option value="">All Location</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="West">West</option>
          <option value="East">East</option>
          <option value="East">Central</option>
        </select>
        <select v-model="selectedRating">
          <option value="">All Rating</option>
          <option value="5.0">5.0</option>
          <option value="4.0">4.0</option>
          <option value="3.0">3.0</option>
          <option value="2.0">2.0</option>
          <option value="1.0">1.0</option>
        </select>
      </div>

        <div class="orders-container">
            <div v-for="order in filteredGroupOrders" :key="order.groupFoodOrderId" class="order-card">
                <header class="order-header">
                    <h2>Order #{{ order.groupFoodOrderId }}</h2>
                </header>
                <div class="order-content">
                    <p><strong>Delivery Location:</strong> {{ order.deliveryLocation }}</p>
                    <p><strong>Delivery Address:</strong> {{ order.deliveryAddress }}</p>
                    <p><strong>Restaurant:</strong> {{ order.restaurantName }}</p>
                    <img :src="order.imgUrl" alt="Restaurant Image" class="restaurant-image"/>
                    <p><strong>Location:</strong> {{ order.location }}</p>
                  <p><strong>Restaurant Address:</strong> {{ order.restaurantAddress }}</p>
                  <p><strong>Rating:</strong> {{ order.rating }}</p>
                    <p><strong>Order Time:</strong> {{ new Date(order.orderTime).toLocaleString() }}</p>
                    <p class="status"><strong>Status:</strong> {{ order.orderStatus }}</p>
                </div>
                <footer class="order-footer">
                    <!-- This button will only show if the orderStatus is 'pending_user_to_join' -->
                    <button class="status-button" v-if="order.orderStatus === 'PENDING_USER_JOIN'"
                        @click="composition.joinGroupOrder(order.groupFoodOrderId)">
                        Join Order
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { GroupOrderViewComposition } from "@/components/customer/grouporderview/GroupOrderViewComposition";
import {RESTAURANT_LOCATIONS} from "@/constants/applicationConstants";

const composition = new GroupOrderViewComposition();
const selectedLocation = ref('');
const selectedRating = ref('');

const {filteredGroupOrders, customerLocation} = composition;

// Ensure reactive connection for selectedStatus
watch(selectedLocation, (newVal) => {
    composition.selectedLocation.value = newVal;
});

watch(selectedRating, (newVal) => {
    composition.selectedRating.value = newVal;
});

</script>

<style scoped lang="scss" src="./GroupOrderView.scss"></style>
