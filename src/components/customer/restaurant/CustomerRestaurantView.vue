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

    <!-- <div v-for="restaurant in composition.filteredRestaurants.value"
         :key="restaurant.id"
         v-bind:title="restaurant.restaurantName"
         @click="composition.selectRestaurant(restaurant)"
         class="restaurant">
      <span>{{ restaurant.restaurantName }}</span>
    </div>
     -->
    <!-- Display All restaurants -->
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
    <!-- xxxxxxx -->
    <!-- <div v-for="menu in menus"
           :key="menu.id"
           :title="menu.menuName"
           class="card">
        <img class="card-img" :src="menu.menuImageURL">
        <p>
          <span>{{ menu.menuName }}</span>
          <span> ${{ menu.menuPrice }}</span>
          <button class="add-basket"
                  @click="composition.addToCart(menu)">
            Add
          </button>
        </p>
    </div> -->
    <!-- xxxxxxx -->
</template>

<script setup>
import { onMounted } from 'vue'
import {CustomerRestaurantViewComposition} from "@/components/customer/restaurant/CustomerRestaurantViewComposition";

// const composition = new CustomerRestaurantViewComposition();

// const {restaurants} = composition;

const composition = new CustomerRestaurantViewComposition();


onMounted(() => {
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

// function filterDisplay() {
//     while (composition.filteredRestaurants.value.length > 0) {
//         composition.filteredRestaurants.value.pop()
//     }
        
//     for (let restaurant of composition.restaurants.value) {
//         const isCuisineMatch = selectedCuisineType === 'all' || restaurant.cuisineType === selectedCuisineType;
//         const isLocationMatch = selectedLocation === 'all' || restaurant.location === selectedLocation;
//         const isRestaurantNameMatch = selectedRestaurantName === 'all' || restaurant.restaurantName === selectedRestaurantName;

//         if (isCuisineMatch && isLocationMatch && isRestaurantNameMatch) {
//             composition.filteredRestaurants.value.push(restaurant);
//             console.log(`found the restaurant: ${restaurant.restaurantName}`)
//         }
//     }
//     sortByRating();
//     console.log(composition.filteredRestaurants.value)
// }

// let isSortAscending = true;

// function sortByRating() {
//     if (composition.filteredRestaurants.value.length > 1) {
//         const order = isSortAscending ? 1 : -1;
//         composition.filteredRestaurants.value.sort((a, b) => order * (a.rating - b.rating));
//         console.log(`Sorted by rating ${isSortAscending ? 'ascending' : 'descending'}`);
//     }
// }

// function toggleSortOrder() {
//     isSortAscending = !isSortAscending;
//     sortByRating();
//     composition.sortOrderLabel.value = isSortAscending ? 'Ascending' : 'Descending';
// }

// function printRestaurant(event) {
//     // document.getElementById('listed_restaurant').addEventListener('click', function() {
//         // Get the selected option's value
//         console.log(event.currentTarget)
//         console.log(event.currentTarget.getAttribute("restaurant_id"))
        
//         // selectedRestaurantName = this.value;
//         // console.log(selectedRestaurantName)
//     // });
    
// }

</script>

<style scoped lang="scss" src="./CustomerRestaurantView.scss"></style>