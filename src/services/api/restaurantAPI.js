import Api from "@/services/api/baseAPI";

const allRestaurants = '/restaurants';

export default {
    getAllRestaurants: () => Api().get(allRestaurants)
};

// const Restaurants = '/restaurants';
// export default {
//     getRestaurants: ()=> Api().get(Restaurants)
// }