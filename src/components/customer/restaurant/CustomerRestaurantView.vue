<template>

  <div>
    <div>
      <form action="" onsubmit="return false">
          <div class="horizontal">
              <label for="cuisine_type">Cuisine Type: </label>
              <select name="cuisine_type" id="cuisine_type">
                  <option value="all" selected="selected">All</option>
                  <option value="Malay">Malay</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Thai">Thai</option>
              </select>
          </div>
          <div class="horizontal">
              <label for="location">Location: </label>
              <select name="location" id="location">
                  <option value="all">All</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="Central">Central</option>
              </select>
          </div>
          <div class="horizontal">
              <label for="restaurant_name">Restaurant Name: </label>
              <select name="restaurant_name" id="restaurant_name">
                  <option value="all">All</option>
                  <option v-for="restaurant in composition.restaurants.value"  v-bind:value="restaurant.restaurantName" v-bind:key="restaurant.restaurantById">
                      {{ restaurant.restaurantName }}
                  </option>
              </select>
          </div>
      </form>
        <br>
    </div>

    <div name="display" id="display">
      <div class="horizontal">
          <label for="restaurant_name">Sort By Rating</label>
          <button @click="composition.toggleSortOrder">
              {{ composition.sortOrderLabel.value }}
          </button>
      </div>
      <div
          v-for="restaurant in composition.filteredRestaurants.value"
          :value="restaurant.img_url"
          :key="restaurant.restaurantById"
          :restaurant_id="restaurant.restaurantById"
          @click="composition.selectRestaurant(restaurant)"
          class="restaurant">
              <div class="horizontal">
                <img class="displayimages" :src="restaurant.restaurantImgURL" :alt="restaurant.restaurantName" />
              </div>
              <div class="horizontal displayimages"
                   :class="{'bold-text': composition.isSelectedRestaurant(restaurant)}"
                   id="listed_restaurant">
                  {{ restaurant.restaurantName }}<br>
                  Rating:  {{ restaurant.rating }}<br>
                  {{ restaurant.location }}<br>
              </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue'
import {CustomerRestaurantViewComposition} from "@/components/customer/restaurant/CustomerRestaurantViewComposition";
import {restaurantStore} from "@/stores/stores";

const composition = new CustomerRestaurantViewComposition();

onMounted(() => {

  composition.restaurants.value = computed(() => restaurantStore.getRestaurants());

  document.getElementById('cuisine_type').addEventListener('change', function() {
      // Get the selected option's value
      composition.selectedCuisineType = this.value;
      composition.filterDisplay();
      // Print the selected option
      console.log('Selected Cuisine Type:', composition.selectedCuisineType);
  });
  document.getElementById('location').addEventListener('change', function() {
      // Get the selected option's value
      composition.selectedLocation = this.value;
      composition.filterDisplay();
      // Print the selected option
      console.log('Selected location:', composition.selectedLocation);
  });
  document.getElementById('restaurant_name').addEventListener('change', function() {
      // Get the selected option's value
      composition.selectedRestaurantName = this.value;
      composition.filterDisplay();
      // Print the selected option
      console.log('Selected restaurant name:', composition.selectedRestaurantName);
  });

})


</script>

<style scoped lang="scss" src="./CustomerRestaurantView.scss"></style>
