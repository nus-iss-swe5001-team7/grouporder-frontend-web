import Api from "@/services/api/baseAPI";

const allGroupOrder = '/order-service/groupFoodOrdersAPI/getAllGroupOrders';

export default {
    getGroupOrder: () => Api().get(allGroupOrder),

    getInfoForGroupOrder: (groupOrderId) => Api().get(`/getInfoForGroupOrder?groupOrderId=${groupOrderId}`),

    getAllPendingJoinGroupOrders: (userId) => Api().get(`/getAllPendingJoinGroupOrders?userId=${userId}`),

    getOrdersForRestaurantStaff : (userId, restaurantId) => Api().get((`/getOrdersForRestaurantStaff?userId=${userId}&restaurantId=${restaurantId}`)),

    getOrdersForDeliveryStaff : (userId, location) => Api().get((`/getOrdersForDeliveryStaff?userId=${userId}&location=${location}`))


};