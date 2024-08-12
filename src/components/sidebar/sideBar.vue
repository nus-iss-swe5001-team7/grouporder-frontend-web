<template>
  <div class="sidebar">
    <div class="sidebar-header">

      <div class="sidebar-header-text centering-grid">
        <div class="sidebar-text centered-item">Actions</div>
      </div>

    </div>

    <div class="sidebar-main-options-container">
      <div v-for="appView in applicationViews" :key="appView.id" :title="appView.name" class="sidebar-option-container">
        <div class="sidebar-option-text-container centering-grid">
          <span class="sidebar-option-text" v-if="appView.id === 'customer_view'">
            <a href="#" @click="composition.selectView(appView)">{{ appView.name }}</a>
          </span>
          <span class="sidebar-option-text" v-if="appView.id === 'customer_order_view'">
            <a href="#" @click="composition.getGroupOrdersByUserId()">{{ appView.name }}</a>
          </span>
          <span class="sidebar-option-text" v-else-if="appView.id === 'group_order_view'">
            <a href="#" @click="composition.getAllGroupOrders()">{{ appView.name }}</a>
          </span>
          <!-- <span class="sidebar-option-text" v-else-if="appView.id === 'restaurant_view'">
            <a href="#" @click="composition.getOrdersForRestaurantStaff()">{{ appView.name }}</a>
          </span> -->
          <!-- <span class="sidebar-option-text" v-else-if="appView.id === 'delivery_view'">
            <a href="#" @click="showLocationModal = true">{{ appView.name }}</a>          
          </span> -->

        </div>
      </div>
    </div>

    <!-- Location Selection Modal -->
    <div v-if="showLocationModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showLocationModal = false">&times;</span>
                <h3>Select a Location for Delivery</h3>
                <select v-model="selectedLocation">
                    <option disabled value="">Please select one</option>
                    <option value="Central">Central</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                </select>
                <button @click="fetchOrdersForDelivery">Fetch Orders</button>
            </div>
        </div>


  </div>

</template>

<script setup>
import { ref } from 'vue';
import { SidebarComposition } from '@/components/sidebar/SidebarComposition';

const composition = new SidebarComposition();

const { applicationViews } = composition;

const showLocationModal = ref(false);
const selectedLocation = ref('');


function fetchOrdersForDelivery() {
    if (selectedLocation.value) {
        composition.getOrdersForDeliveryStaff(selectedLocation.value);
        showLocationModal.value = false; // Close the modal after fetching
    } else {
        alert("Please select a location first.");
    }
}

</script>

<style scoped lang="scss" src="./Sidebar.scss"></style>
