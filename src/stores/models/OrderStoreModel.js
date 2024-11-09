import orderAPI from "@/services/api/orderAPI";
import {orderListStore, paymentStore} from "@/stores/stores";
import { uiStore } from "@/stores/stores";
import { APPLICATION_VIEWS } from "@/constants/applicationConstants";
import { ORDER_STATUS } from "@/constants/applicationConstants";

export class OrderStoreModel {
    constructor() {
        this.init();
        this.fetchOrders = [];
        this.remainingTimes = {};
        //this.timerIntervals = {}; // Store timer intervals for each order
    }

    init() {
        this.orderId = "";
        this.orderStatus = "";
        this.selectedOrderItemId = null;
    }

    getSelectedOrderItemId() {
        return this.selectedOrderItemId;
    }

    setSelectedOrderItemId(value) {
        this.selectedOrderItemId = value;
    }

    sendOrder(order) {
        const data = order.toRest();
        return orderAPI.sendOrder(data).then(response => {
            if (response.status === 200) {
                var data = response.data
                console.log(response.data);
                this.setSelectedOrderItemId(data.id)
                console.log(this.getSelectedOrderItemId())

                ///modified
                // backend response back with order_item_id
                // modified setPaymentRequired(true, order_item_id)
                paymentStore.setPaymentRequired(true);
            }
        }).catch(error => {
            alert(error.response.data);
            paymentStore.paymentRequired = false;
            paymentStore.paymentPending = false;
            orderListStore.getAllGroupOrders();
        });
    }

    setActiveView() {
        uiStore.setActiveView(APPLICATION_VIEWS.CUSTOMER_ORDERS_VIEW);
    }

    setOrderStatusDescription(orderStatus, orderId, orderIdList){
        var orderStatusDesc = ORDER_STATUS.PENDING_USER_JOIN.description;
        switch (orderStatus) {
            case ORDER_STATUS.PENDING_USER_JOIN.status:
                if (orderIdList[0] !== orderId) {
                    orderStatusDesc = "You have joined the order, " + orderIdList.length + " have joined! Please wait for other customer to join."
                } else if (orderIdList.length > 1) {
                    orderStatusDesc ="Your order has been created, " + orderIdList.length + " have joined! Please wait for other customer to join."
                } else {
                    orderStatusDesc = ORDER_STATUS.PENDING_USER_JOIN.description;
                }
                break;
            case ORDER_STATUS.SUBMITTED_TO_RESTAURANT.status:
                orderStatusDesc = ORDER_STATUS.SUBMITTED_TO_RESTAURANT.description;
                break;
            case ORDER_STATUS.ORDER_CANCEL.status:
                orderStatusDesc = ORDER_STATUS.ORDER_CANCEL.description;
                break;
            case ORDER_STATUS.KITCHEN_PREPARING.status:
                orderStatusDesc = ORDER_STATUS.KITCHEN_PREPARING.description;
                break;
            case ORDER_STATUS.READY_FOR_DELIVERY.status:
                orderStatusDesc = ORDER_STATUS.READY_FOR_DELIVERY.description;
                break;
            case ORDER_STATUS.ON_DELIVERY.status:
                orderStatusDesc = ORDER_STATUS.ON_DELIVERY.description;
                break;
            case ORDER_STATUS.DELIVERED.status:
                orderStatusDesc = ORDER_STATUS.DELIVERED.description;
                break;
          }
          return orderStatusDesc;
    }

    async getGroupOrdersByUserId(userId) {
        this.fetchOrders = [] // reset fetchOrders when click on the order menu again
        this.setActiveView();
        try {
            const response = await orderAPI.getGroupOrdersByUserId(userId);
            // console.log("---------------------------getGroupOrdersByUserId***--------------" + response.data);

            response.data.forEach(groupOrder => {
                this.fetchOrders.push({
                    orderId: groupOrder.orderId,
                    orderTime: groupOrder.orderTime,
                    orderStatus: groupOrder.orderStatus,
                    orderStatusDesc : this.setOrderStatusDescription(groupOrder.orderStatus, groupOrder.orderId, groupOrder.orderIdsList),
                    orderDetailDtoList: groupOrder.orderDetailDtoList,
                    deliveryFee: groupOrder.deliveryFee,
                    deliveryLocation: groupOrder.deliveryLocation,
                    deliveryAddress: groupOrder.deliveryAddress,
                    deliveryLatitude: groupOrder.deliveryLatitude,
                    deliveryLongitude: groupOrder.deliveryLongitude,
                    totalPrice: groupOrder.totalPrice,
                    groupFoodOrderId: groupOrder.groupFoodOrderId,
                    location: groupOrder.location,
                    restaurantName: groupOrder.restaurantName,
                    restaurantAddress: groupOrder.restaurantAddress,
                    rating: groupOrder.rating
                });
                // console.log("groupOrder.groupFoodOrderId :===" + groupOrder.groupFoodOrderId);
                // this.fetchOrderCreatedTime(groupOrder.orderTime);
            });
            // console.log(this.fetchOrders);
        } catch (error) {
            return alert(error);
        }

    }

    getTimerForGroupOrder(groupOrderId) {
        orderAPI.getTimerForGroupOrder(groupOrderId)
            .then((response) => {
                if (response && response.status === 200) {
                    this.remainingTimes[groupOrderId] = response.data;
                } else {
                    // Handle other status codes
                    console.error('Error fetching timer data:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching timer data:', error);
                alert('An error occurred while fetching timer data.');
            });
    }

    updateStatusToSubmittedToRestaurant(orderId) {
        orderAPI.updateStatusToSubmittedToRestaurant(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);

                if (updatedOrderIndex !== -1) {
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.SUBMITTED_TO_RESTAURANT.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.SUBMITTED_TO_RESTAURANT.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status - updateStatusToSubmittedToRestaurant:', error);
        });
    }

    updateStatusToOrderCancel(orderId) {
        orderAPI.updateStatusToOrderCancel(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);

                if (updatedOrderIndex !== -1) {
                    // console.log("this.fetchOrders.value[updatedOrderIndex]:"+this.fetchOrders[updatedOrderIndex]);
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.ORDER_CANCEL.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.ORDER_CANCEL.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status:', error);
        });
    }

    deleteOrder(orderId) {
        orderAPI.deleteOrder(orderId).then(response => {
            if (response.status == 200) {
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.orderId === orderId);

                if (updatedOrderIndex !== -1) {
                    // console.log("this.fetchOrders.value[updatedOrderIndex]:"+this.fetchOrders[updatedOrderIndex]);
                    this.fetchOrders.splice(updatedOrderIndex, 1);
                }
            }
        }).catch(error => {
            console.error('Error updating status:', error);
        });
    }

    updateStatusToKitchenPreparing(orderId) {
        orderAPI.updateStatusToKitchenPreparing(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);
                if (updatedOrderIndex !== -1) {
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.KITCHEN_PREPARING.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.KITCHEN_PREPARING.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status - updateStatusToKitchenPreparing:', error);
        });
    }

    updateStatusToReadyForDelivery(orderId) {
        orderAPI.updateStatusToReadyForDelivery(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);

                if (updatedOrderIndex !== -1) {
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.READY_FOR_DELIVERY.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.READY_FOR_DELIVERY.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status - updateStatusToReadyForDelivery:', error);
        });
    }

    updateStatusToOnDelivery(orderId) {
        orderAPI.updateStatusToOnDelivery(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);

                if (updatedOrderIndex !== -1) {
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.ON_DELIVERY.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.ON_DELIVERY.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status - updateStatusToOnDelivery:', error);
        });
    }

    updateStatusToDelivered(orderId) {
        orderAPI.updateStatusToDelivered(orderId).then(response => {
            if(response.status ==200){
                const updatedOrderIndex = this.fetchOrders.findIndex(order => order.groupFoodOrderId === orderId);

                if (updatedOrderIndex !== -1) {
                    this.fetchOrders[updatedOrderIndex].orderStatus = ORDER_STATUS.DELIVERED.status;
                    this.fetchOrders[updatedOrderIndex].orderStatusDesc = ORDER_STATUS.DELIVERED.description;
                }
            }
        }).catch(error => {
            console.error('Error updating status - updateStatusToDelivered:', error);
        });
    }

}




