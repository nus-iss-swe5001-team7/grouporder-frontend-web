import RestaurantAPI from "@/services/api/restaurantAPI";
import {RestaurantModel} from "@/entity/RestaurantModel";

export class RestaurantStoreModel {
    constructor() {
        this.init();
        this.restaurants = [];
        this.selectedRestaurantId = null;
    }

    getRestaurants() {
        return this.restaurants;
    }

    getRestaurantById(id) {
        return this.restaurants.find(restaurant => restaurant.id === id);
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
            this.restaurants = generateRestaurantModels(response.data);
            //console.log("getAllRestaurants:===" + response.data);
        });
       
    }
}

function generateRestaurantModels(restaurantDataList) {
    //console.log("generateRestaurantModels:===" + restaurantDataList);
    return restaurantDataList.map(restaurantData => new RestaurantModel(restaurantData));
}
