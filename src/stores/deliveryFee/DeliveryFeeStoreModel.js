import {cartStore, restaurantStore} from "@/stores/stores";

export class DeliveryFeeStoreModel {
    constructor() {
        this.init()
    }

    init() {
        this.deliveryFee = 0;
        this.numberOfUsers = 1;
    }

    calculateDeliveryFee(customerLocation) {

        cartStore.promoStatus = false;

        const distanceMap = {
            "North": { "West": 10, "East": 20, "South": 15 },
            "West": { "East": 25, "South": 14 },
            "South": { "East": 18 },
            "Central": { "North": 12, "West": 12, "East": 12, "South": 12 },
            "East": {},
        };

        const sendingLocation = customerLocation;
        const restaurantLocation = restaurantStore.getRestaurantLocation();

        // If the sending location or restaurant location is not valid, return 0 as delivery fee
        if (!distanceMap[sendingLocation] || !distanceMap[restaurantLocation]) {
            this.deliveryFee = 0;
            return;
        }

        // If the sending location and restaurant location are the same, set delivery fee to 5
        if (sendingLocation === restaurantLocation) {
            this.deliveryFee = 5;
            return;
        }

        // Calculate the distance between sending and restaurant locations and assign delivery fee accordingly
        this.deliveryFee = this.calculateMutualDistance(distanceMap, sendingLocation, restaurantLocation);
    }

    // Function to calculate mutual distance between two locations
    calculateMutualDistance(distanceMap, location1, location2) {
        // Check if both locations have mutual distance defined
        if (distanceMap[location1][location2] !== undefined) {
            return distanceMap[location1][location2];
        } else if (distanceMap[location2][location1] !== undefined) {
            return distanceMap[location2][location1];
        } else {
            // If mutual distance is not defined, return 0
            return 0;
        }
    }


}
