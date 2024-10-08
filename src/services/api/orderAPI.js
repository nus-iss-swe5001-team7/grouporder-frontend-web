import Api from "@/services/api/baseAPI";

const Order = '/order-service/groupFoodOrdersAPI/groupFoodOrder';

export default {
    sendOrder: (order) => Api().post(Order, order),

    getGroupOrdersByUserId: (userId) =>  Api().get(`/order-service/groupFoodOrdersAPI/groupOrders?parameter=${userId}`),

    updateStatusToSubmittedToRestaurant: (orderId) => Api().put(`/order-service/groupFoodOrdersAPI/submittedToRestaurant/${orderId}`),

    updateStatusToOrderCancel: (orderId) => Api().put(`/orderCancel/${orderId}`),

    updateStatusToKitchenPreparing: (orderId) => Api().put(`/kitchenPreparing/${orderId}`),

    updateStatusToReadyForDelivery: (orderId) => Api().put(`/readyForDelivery/${orderId}`),

    updateStatusToOnDelivery: (orderId) => Api().put(`/onDelivered/${orderId}`),

    updateStatusToDelivered: (orderId) => Api().put(`/delivered/${orderId}`),

    deleteOrder: (orderId) =>  Api().put(`/deleteOrder?parameter=${orderId}`),

}
