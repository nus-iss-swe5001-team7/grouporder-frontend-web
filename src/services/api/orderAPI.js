import Api from "@/services/api/baseAPI";

const Order = '/order-service/groupFoodOrdersAPI/groupFoodOrder';

export default {
    sendOrder: (order) => Api().post(Order, order),

    getGroupOrdersByUserId: (userId) =>  Api().get(`/order-service/groupFoodOrdersAPI/groupOrders?parameter=${userId}`),

    updateStatusToSubmittedToRestaurant: (orderId) => Api().put(`/order-service/groupFoodOrdersAPI/submittedToRestaurant/${orderId}`),

    updateStatusToOrderCancel: (orderId) => Api().put(`/order-service/groupFoodOrdersAPI/orderCancel/${orderId}`),

    updateStatusToKitchenPreparing: (orderId) => Api().put(`/order-service/groupFoodOrdersAPI/kitchenPreparing/${orderId}`),

    updateStatusToReadyForDelivery: (orderId) => Api().put(`/order-service/groupFoodOrdersAPI/readyForDelivery/${orderId}`),

    updateStatusToOnDelivery: (orderId) => Api().put(`/delivery-service/deliveryAPI/onDelivered/${orderId}`),

    updateStatusToDelivered: (orderId) => Api().put(`/delivery-service/deliveryAPI/delivered/${orderId}`),

    deleteOrder: (orderId) =>  Api().put(`/order-service/groupFoodOrdersAPI/deleteOrder?parameter=${orderId}`),

}
