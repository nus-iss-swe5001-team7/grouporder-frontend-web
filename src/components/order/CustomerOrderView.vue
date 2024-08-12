<template>

     <div class="group-orders">
        <h1>My Order</h1>
                <select v-model="selectedStatus">
                    <option value="">All Statuses</option>
                    <option v-for="(status, key) in Object.values(ORDER_STATUS)" :value="status.status" :key="key">{{ status.status }}</option>
                </select>
                <select v-model="selectedLocation">
                    <option value="">All Location</option>
                    <option v-for="(location, key) in Object.values(RESTAURANT_LOCATIONS)" :value="location.name" :key="key">{{ location.name }}</option>
                </select>
                <select v-model="selectedRating">
                    <option value="">All Rating</option>
                    <option v-for="(rating, key) in Object.values(RESTAURANT_RATING)" :value="rating.rate" :key="key">{{ rating.rate }}</option>
                </select>
            <div class='order-table' v-for="(order, index) in filteredGroupOrders" :key="index">
                <header class="order-header">
                    <h2>Order #{{ order.orderId }}</h2>
                    <div id="order-info">
                      <p>
                        <span id="order-date">{{ new Date(order.orderTime).toLocaleString() }}</span>
                      </p>
                      <p>
                        <span>Restaurant Name: {{ order.restaurantName }}</span>
                      </p>
                    </div>
                </header>
                <div class='orders-container'>
                    <div v-if="Array.isArray(order.orderDetailDtoList)">
                        <ul class="order-column"  v-for="(item, nestedIndex) in order.orderDetailDtoList" :key="nestedIndex">
                            <li>
                                <img :src="item.imgUrl">
                            </li>
                            <li class='order-item'>{{item.name}}</li>
                            <li class='order-item-desc'>{{item.description}}</li>
                            <li class='order-item'>Price : ${{item.price}}</li>
                            <li class='order-item'>Qty : {{item.quantity}}</li>
                        </ul>
                    </div>

                    <div class='orders-container2'>
                        <p><strong>Total Price : </strong>${{order.totalPrice.toFixed(2)}}</p>
                        <p><strong>Delivery Fee : </strong>${{order.deliveryFee.toFixed(2)}}</p>
                        <p><strong>Order Status : </strong>{{order.orderStatusDesc}}
                          <button v-if="order.orderStatus=='PENDING_USER_JOIN'" title="Refresh to get latest status!" @click="composition.refreshOrder()">
                            <i class="fas fa-sync-alt"></i>
                          </button></p>
                        <p v-if="order.orderStatus=='PENDING_USER_JOIN'">Time remaining: {{ composition.getTimer(order.groupFoodOrderId) }}</p>
                        <p>
                            <button class="status-button" v-if="order.orderStatus=='PENDING_USER_JOIN'"
                                  @click="composition.updateStatusToSubmittedToRestaurant(order.groupFoodOrderId)">Send to Restaurant</button>
                            <button class="status-button" v-if="order.orderStatus=='PENDING_USER_JOIN'"
                            @click="composition.updateStatusToOrderCancel(order.groupFoodOrderId, order.orderId)">Cancel Order</button>
                        </p>
                    </div>
                </div>
            </div>
    </div>

</template>

<script setup>
import {CustomerOrderViewComposition} from "@/components/order/CustomerOrderViewComposition";
const composition = new CustomerOrderViewComposition();
//const {fetchOrders, remainingTimes} = composition;
const {filteredGroupOrders} = composition;


//start Countdown for updateStatusToSubmittedToRestaurant

//onMounted(() => {
 //   const timerInterval =setInterval(() => { composition.startTimers() }, 1000);
  //  console.log("timerInterval====6.1---"+timerInterval);
  //  return () => clearInterval(timerInterval);
   //clearInterval(timerInterval);
//})
/*
onMounted(() => {
  const timerInterval = setInterval(() => {
    composition.startTimers();
    if (isAllTimersStopped()) {
        console.log("clearInterval---2");
      clearInterval(timerInterval);
    }
  }, 1000);

  return () => clearInterval(timerInterval);
});

function isAllTimersStopped() {
  for (const orderId in composition.remainingTimes) {
    if (composition.remainingTimes[orderId].value > 0) {
      console.log("remainingTimes is false for "+orderId);
      return false; // At least one timer is still running
    }
  }
  console.log("isAllTimersStopped---1");
  return true; // All timers are stopped
}
*/
//end Countdown for updateStatusToSubmittedToRestaurant

//Start filter order by Status, Location and Rating
import { ORDER_STATUS, RESTAURANT_LOCATIONS, RESTAURANT_RATING } from "@/constants/applicationConstants";
import { ref, watch } from 'vue';
const selectedStatus = ref('PENDING_USER_JOIN');
const selectedLocation = ref('');
const selectedRating = ref('');


watch(selectedStatus, (newVal) => {
    composition.selectedStatus.value = newVal;
});

watch(selectedLocation, (newVal) => {
    composition.selectedLocation.value = newVal;
});

watch(selectedRating, (newVal) => {
    composition.selectedRating.value = newVal;
});

</script>

<style scoped lang="scss" src="./CustomerOrderView.scss"></style>
