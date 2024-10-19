import Api from "@/services/api/baseAPI";

const allGroupOrder = '/groupFoodOrdersAPI/getAllGroupOrders';

export default {
    getGroupOrder: () => Api().get(allGroupOrder),

    getInfoForGroupOrder: (groupOrderId) => Api().get(`/groupFoodOrdersAPI/getInfoForGroupOrder?groupOrderId=${groupOrderId}`),

    getAllPendingJoinGroupOrders: (userId) => Api().get(`/groupFoodOrdersAPI/getAllPendingJoinGroupOrders?userId=${userId}`),

    getOrdersForRestaurantStaff : (userId, restaurantId) => Api().get((`/groupFoodOrdersAPI/getOrdersForRestaurantStaff?userId=${userId}&restaurantId=${restaurantId}`)),

    getOrdersForDeliveryStaff : (userId, location) => Api().get((`/deliveryAPI/getAllGroupOrdersForDelivery?userId=${userId}&location=${location}`))


};