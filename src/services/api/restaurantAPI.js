import Api from "@/services/api/baseAPI";

const allRestaurants = '/restaurants/all';

export default {
    getAllRestaurants: () => Api().get(allRestaurants)
};
