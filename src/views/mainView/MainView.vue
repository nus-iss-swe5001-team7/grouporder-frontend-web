<template>
  <div class="main-view-container">
    <TopMenu></TopMenu>

    <SideBar></SideBar>

    <div v-if="activeView.id === applicationViews.CUSTOMER_VIEW.id" class="grid-area">
      <div class="first-view-area view-area">
        <CustomerView class="view-area-item"></CustomerView>
      </div>
    </div>

    <div v-if="activeView.id === applicationViews.RESTAURANT_VIEW.id" class="grid-area">
      <div class="first-view-area view-area">
        <RestaurantView class="view-area-item"></RestaurantView>
      </div>
    </div>

    <div v-if="activeView.id === applicationViews.DELIVERY_VIEW.id" class="grid-area">
      <div class="first-view-area view-area">
        <DeliveryView class="view-area-item"></DeliveryView>
      </div>
    </div>

     <div v-if="activeView.id === applicationViews.CUSTOMER_ORDERS_VIEW.id" class="grid-area full-screen-view">
      <div class="first-view-area view-area">
        <CustomerOrderView class="view-area-item"></CustomerOrderView>
      </div>
    </div>

    <div v-if="activeView.id === applicationViews.GROUP_ORDERS_VIEW.id" class="grid-area full-screen-view">
      <div class="first-view-area view-area">
        <GroupOrderView class="view-area-item"></GroupOrderView>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import TopMenu from '@/components/topMenu/topMenu.vue';
import SideBar from '@/components/sidebar/sideBar.vue';
import {MainViewComposition} from "@/views/mainView/MainViewComposition";
import CustomerView from "@/components/customer/CustomerView.vue";
import RestaurantView from "@/components/restaurant/RestaurantView.vue";
import DeliveryView from "@/components/delivery/DeliveryView.vue";
import CustomerOrderView from "@/components/order/CustomerOrderView.vue";
import GroupOrderView from '@/components/customer/grouporderview/GroupOrderView.vue';

const {activeView, applicationViews} = new MainViewComposition();
</script>

<style scoped lang="scss" src="./MainView.scss"></style>
