import {cartStore, restaurantStore, uiStore} from "@/stores/stores";
import {computed, onMounted, ref, watch} from "vue";
import {STEPS} from "@/constants/applicationConstants";

export class CustomerRestaurantViewComposition {

    // // dummy data
    constructor() {
        this.restaurants = computed(() => restaurantStore.getRestaurants());
        this.filteredRestaurants = ref([]);
        this.sortOrderLabel = ref("Ascending");
        this.isSortAscending = true;
        this.selectedCuisineType = "all";
        this.selectedLocation = "all";
        this.selectedRestaurantName = "all";

        onMounted(() => {
            this.restaurants.value = restaurantStore.getRestaurants();
            this.sortRestaurant();
        });

        watch(this.restaurants, () => {
            this.sortRestaurant();
        }, { immediate: true });

        this.sortRestaurant();
    }

    sortRestaurant() {
        for (let restaurant of this.restaurants.value) {
            this.filteredRestaurants.value.push(restaurant);
            this.sortByRating();
        }
    }

    filterDisplay() {
        while (this.filteredRestaurants.value.length > 0) {
            this.filteredRestaurants.value.pop()
        }

        for (let restaurant of this.restaurants.value) {
            const isCuisineMatch = this.selectedCuisineType === 'all' || restaurant.cuisineType === this.selectedCuisineType;
            const isLocationMatch = this.selectedLocation === 'all' || restaurant.location === this.selectedLocation;
            const isRestaurantNameMatch = this.selectedRestaurantName === 'all' || restaurant.restaurantName === this.selectedRestaurantName;

            if (isCuisineMatch && isLocationMatch && isRestaurantNameMatch) {
                this.filteredRestaurants.value.push(restaurant);
                console.log(`found the restaurant: ${restaurant.restaurantName}`)
            }
        }
        this.sortByRating();
        console.log(this.filteredRestaurants.value)
    }



    sortByRating() {
        if (this.filteredRestaurants.value.length > 1) {
            const order = this.isSortAscending ? 1 : -1;
            this.filteredRestaurants.value.sort((a, b) => order * (a.rating - b.rating));
            console.log(`Sorted by rating ${this.isSortAscending ? 'ascending' : 'descending'}`);
        }
    }

    toggleSortOrder() {
        this.isSortAscending = !this.isSortAscending;
        this.sortByRating();
        this.sortOrderLabel.value = this.isSortAscending ? 'Ascending' : 'Descending';
    }

    selectRestaurant(restaurant) {
        if (cartStore.cartItems.length !== 0 && !this.isSelectedRestaurant(restaurant)) {
            const result = window.confirm("Reselect the restaurant will remove the menus you have already selected! Are you sure you want to proceed?");

            if (result) {
                restaurantStore.setSelectedRestaurantId(restaurant.id);
                cartStore.init();
            } else {
                console.log(restaurantStore.getRestaurantName());
            }
        } else {
            restaurantStore.setSelectedRestaurantId(restaurant.id);
        }
        uiStore.setCurrentStep(STEPS.MENU);
    }

    isSelectedRestaurant(restaurant) {
        return restaurantStore.getSelectedRestaurantId() === restaurant.id;
    }

}
