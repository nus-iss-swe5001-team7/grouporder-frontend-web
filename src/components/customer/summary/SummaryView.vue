<template>
  <div>
    <h4>My Cart</h4>
    <div class="cart-summary">
      <div>
        <h4>Summary</h4>
      </div>
      <div class="cart-rows">
        <ul style="padding: 0">
          <li v-for="items in cartItems"
              :key="items.menuId"
              class="items-style">
            <div class="cart-items">
              <img class="item" :src="items.menuImageURL" width="50px" height="50px" style="border-radius: 50%; object-fit: cover"/>
              <div>
                <span class="items-content">{{ items.name }}</span>
                <div class="preference-content">
                <span v-for="(value, key) in items.preferences" :key="key">
                    {{ composition.formatPreferenceType(key) }}: {{ composition.formatOption(value) }}<br>
                </span>
                </div>
              </div>
              <div>
                <button class="quantity-change-button" @click="composition.removeItem(items)" type="button"> -</button>
                <span class="cart-quantity">{{ items.quantity }}</span>
                <button class="quantity-change-button" @click="composition.addItem(items)" type="button"> +</button>
              </div>
              <div class="items-content-price"> ${{ items.price.toFixed(2) }}</div>
            </div>
            <div class="line"></div>
          </li>
          <li class="cart-items total-price-item" v-if="cartItems.length > 0"> Total Price : {{ totalPrice.toFixed(2) }}</li>
        </ul>
      </div>
    </div>

    <div v-if="composition.checkDeliveryLocation()"
         class="delivery-location">Delivery Location:
      <select v-model="customerLocation" required>
        <option disabled value="">Select a location</option>
        <option v-for="(location, key) in Object.values(RESTAURANT_LOCATIONS)" :value="location.name" :key="key">
          {{ location.name }}
        </option>
      </select>
    </div>

    <div v-if="composition.checkDeliveryLocation()">
      <div id="map" style="height: 400px; width: 100%;"></div>

      <!-- Display selected address and coordinates after user selects from the map -->
      <div class="delivery-location">
        <p v-if="composition.customerAddress !== ''">Selected Address: {{ composition.customerAddress }}</p>
        <p v-if="composition.deliveryLatitude">Latitude: {{ composition.deliveryLatitude.value }}</p>
        <p v-if="composition.deliveryLongitude">Longitude: {{ composition.deliveryLongitude.value }}</p>
        <!-- New input for unit number -->
        <div class="unit-Number">
          <label for="unitNumber">Unit Number:</label>
          <input type="text" id="unitNumber" v-model="unitNumber" placeholder="Enter unit number" />
        </div>
      </div>
    </div>

    <div v-if="composition.showDeliveryLocation()">
      <div class="delivery-location">Delivery Location: {{customerLocation}}</div>
      <div class="delivery-location">Delivery address: {{jointOrderAddress}}</div>
    </div>

    <div class="delivery-location" v-if="deliveryFee > 0 && cartStore.showCart">
      Delivery Fee: {{ deliveryFee.toFixed(2) }}
    </div>
    <div v-if="customerLocation === '' && cartItems.length > 0" class="delivery-location">
      No location selected
    </div>

    <div v-if="!showCart">
      Cart is empty! Start to <a href="#" @click="composition.startOrder()">Order</a>!
    </div>

    <!-- <div>
      <span id="promo-status-id"> {{ promoStatus ? "Apply Promo" : "No Promo"}}</span>
      <label class="switch">
        <input type="checkbox" @change="composition.togglePromo">
        <span class="slider round"></span>
      </label>
      <br>
      <li>
        <span class="promo-display" id="promo-status-id">{{ promoStatus ? "Promo Price: " + finalPromoPrice : "" }}</span>
      </li>

    </div> -->

    <div v-if="showCart">
      <span id="promo-status-id">{{ promoStatus ? "Apply Promo " : "No Promo" }}</span>
      <label class="switch">
        <input type="checkbox" v-model="promoStatus" @change="composition.togglePromo">
        <span class="slider round"></span>
      </label>
      <br>
      <!-- <li v-if="promoStatus"> -->
        <!-- <p class="promo-display" >*** After Applying Promotion ***</p> -->
        <span v-if="promoStatus" class="promo-display ">Yay! {{ promoType }} applied! Your promo price is $ {{ finalPromoPrice }}</span>
        <!-- <span id="promo-status-id">{{ promoStatus ? "Apply Promo " : "No Promo" }}</span> -->
        <!-- <span class="promo-display slider round" v-if="promoStatus">{{ promoStatus ? " After Applying Promotion " + finalPromoPrice : "No Promo" }}</span> -->
      <!-- </li> -->
    </div>


    <!-- <div>{{updatedPrice}}</div> -->

    <button v-if="showCart"
            class="checkout-button"
            @click="composition.undo()">
      Undo Change
    </button>

    <button v-if="showCart"
            class="checkout-button"
            @click="composition.cancel()">
      Cancel
    </button>

    <button v-if="showCart && !jointOrder"
            class="checkout-button"
            @click="composition.sendOrder()">
      Confirm
    </button>
    <button v-if="showCart && jointOrder"
            class="checkout-button"
            @click="composition.joinOrder()">
      Confirm to Join the GroupFood Order
    </button>

  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import {SummaryViewComposition} from "@/components/customer/summary/SummaryViewComposition";
import {RESTAURANT_LOCATIONS} from "@/constants/applicationConstants";
import {cartStore} from "@/stores/stores";
const composition = new SummaryViewComposition();
onMounted(() => {
  composition.initMap(); // Initialize the map when the component is mounted
});
const {cartItems, showCart, totalPrice, promoStatus, finalPromoPrice, customerLocation, jointOrderAddress, unitNumber, deliveryFee, jointOrder, promoType} = composition;



</script>

<style scoped lang="scss" src="./SummaryView.scss"></style>

