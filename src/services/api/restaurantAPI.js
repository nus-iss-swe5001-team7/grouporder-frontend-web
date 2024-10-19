import Api from "@/services/api/baseAPI";

const allRestaurants = '/restaurant-service/restaurants/all';

export default {
    getAllRestaurants: () => Api().get(allRestaurants)
};
