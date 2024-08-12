import RestaurantAPI from "@/services/api/restaurantAPI";
import {RestaurantModel} from "@/entity/RestaurantModel";

export class RestaurantStoreModel {
    constructor() {
        this.init();
        this.selectedRestaurantId = null;
    }

    getRestaurants() {
        return this.restaurants;
    }

    getSelectedRestaurant() {
        return this.restaurants.find(restaurant => restaurant.id === this.selectedRestaurantId);
    }

    getRestaurantLocation() {
        return this.getSelectedRestaurant() ? this.getSelectedRestaurant().location : null;
    }

    getRestaurantName() {
        return this.getSelectedRestaurant() ? this.getSelectedRestaurant().restaurantName : null;
    }

    getSelectedRestaurantId() {
        return this.selectedRestaurantId;
    }

    setSelectedRestaurantId(value) {
        this.selectedRestaurantId = value;
    }

    init() {
        RestaurantAPI.getAllRestaurants()
        .then(response => {
            this.restaurants = generateRestaurantModels(response.data)
        });
    }
}

function generateRestaurantModels(restaurantDataList) {
    return restaurantDataList.map(restaurantData => new RestaurantModel(restaurantData));
}