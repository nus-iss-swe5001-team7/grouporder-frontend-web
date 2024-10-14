import Api from "@/services/api/baseAPI";

const allGroupOrder = '/order-service/groupFoodOrdersAPI/getAllGroupOrders';

export default {
    getGroupOrder: () => Api().get(allGroupOrder),

    getInfoForGroupOrder: (groupOrderId) => Api().get(`/order-service/groupFoodOrdersAPI/getInfoForGroupOrder?groupOrderId=${groupOrderId}`),

    getAllPendingJoinGroupOrders: (userId) => Api().get(`/order-service/groupFoodOrdersAPI/getAllPendingJoinGroupOrders?userId=${userId}`),

    getOrdersForRestaurantStaff : (userId, restaurantId) => Api().get((`/order-service/groupFoodOrdersAPI/getOrdersForRestaurantStaff?userId=${userId}&restaurantId=${restaurantId}`)),

    getOrdersForDeliveryStaff : (userId, location) => Api().get((`/delivery-service/deliveryAPI/getAllGroupOrdersForDelivery?userId=${userId}&location=${location}`))


};