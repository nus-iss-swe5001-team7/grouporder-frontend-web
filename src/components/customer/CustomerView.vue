<template>

  <div>
    <div>
      <a href="#"
         v-for="(step, index) in filteredSteps"
         :key="index"
         @click="composition.selectCurrentStep(step)">
        {{ step.name }}
        <span v-if="!composition.isLastStep(index)"> | </span>
      </a>
    </div>
  </div>

<div>
  <div v-if="showRestaurant">
    <RestaurantView></RestaurantView>
  </div>

  <div v-if="showMenu">
    <MenuView></MenuView>
  </div>

  <div v-if="showCart">
    <SummaryView></SummaryView>
  </div>

  <div v-if="showPayment">
    <PaymentView></PaymentView>
  </div>
</div>
</template>

<script setup>
import {CustomerViewComposition} from "@/components/customer/CustomerViewComposition";
import RestaurantView from "@/components/customer/restaurant/CustomerRestaurantView.vue";
import MenuView from "@/components/customer/menu/MenuView.vue";
import SummaryView from "@/components/customer/summary/SummaryView.vue";
import PaymentView from "@/components/customer/payment/PaymentView.vue";

const composition = new CustomerViewComposition();

const {filteredSteps, showRestaurant, showMenu, showCart, showPayment} = composition;

</script>

<style scoped lang="scss" src="./CustomerView.scss"></style>