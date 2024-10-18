import Api from "@/services/api/baseAPI";

const Order = '/groupFoodOrdersAPI/groupFoodOrder';

export default {
    sendOrder: (order) => Api().post(Order, order),

    getGroupOrdersByUserId: (userId) =>  Api().get(`/groupFoodOrdersAPI/groupOrders?parameter=${userId}`),

    updateStatusToSubmittedToRestaurant: (orderId) => Api().put(`/groupFoodOrdersAPI/submittedToRestaurant/${orderId}`),

    updateStatusToOrderCancel: (orderId) => Api().put(`/groupFoodOrdersAPI/orderCancel/${orderId}`),

    updateStatusToKitchenPreparing: (orderId) => Api().put(`/groupFoodOrdersAPI/kitchenPreparing/${orderId}`),

    updateStatusToReadyForDelivery: (orderId) => Api().put(`/groupFoodOrdersAPI/readyForDelivery/${orderId}`),

    updateStatusToOnDelivery: (orderId) => Api().put(`/deliveryAPI/onDelivered/${orderId}`),

    updateStatusToDelivered: (orderId) => Api().put(`/deliveryAPI/delivered/${orderId}`),

    deleteOrder: (orderId) =>  Api().put(`/groupFoodOrdersAPI/deleteOrder?parameter=${orderId}`),

}
