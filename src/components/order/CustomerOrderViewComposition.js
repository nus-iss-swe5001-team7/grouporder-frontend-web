import {orderStore, userStore} from '@/stores/stores';
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {ORDER_STATUS, RESTAURANT_RATING} from "@/constants/applicationConstants";
import GroupOrderViewAPI from "@/services/api/groupOrderViewAPI";

export class CustomerOrderViewComposition{

    constructor() {
        this.fetchOrders = computed(()=>orderStore.fetchOrders);
        this.selectedStatus =  ref('PENDING_USER_JOIN');
        this.selectedLocation = ref('');
        this.selectedRating = ref('');
        this.numberOfUsers = 0;
        this.isMainOrder = true;
        this.status = '';

        onMounted(() => this.startTimers());
        onUnmounted(() => this.deleteIntervals());
    }

    startTimers() {
        this.interval = setInterval(() => {
            let shouldRefresh = false;

            this.fetchOrders.value.forEach(order => {
                order.remainingTime = this.getRemainingTime(order.orderTime);
                if (order.orderStatus === 'PENDING_USER_JOIN' && order.remainingTime === 0) {
                    shouldRefresh = true;
                }
            });

            if (shouldRefresh) {
                this.refreshOrder();
            }
        }, 1000);
    }

    getRemainingTime(orderTime) {
        const currentTime = new Date().getTime();
        const orderTimeInMs = new Date(orderTime).getTime();
        const tenMinutesInMs = 10 * 60 * 1000; // 10 minutes in milliseconds
        return Math.max(0, Math.floor((orderTimeInMs + tenMinutesInMs - currentTime) / 1000));
    }

    updateStatusToSubmittedToRestaurant(orderId)  {
        orderStore.updateStatusToSubmittedToRestaurant(orderId);
    }

    updateStatusToOrderCancel(groupOrderId, orderId) {
        this.getNumberOfOrdersJoined(groupOrderId, orderId).then(() => {
                if (this.numberOfUsers > 1 && this.isMainOrder) {
                    alert("Cannot cancel the order, others have joined!")
                }
                if (this.numberOfUsers === 1 && this.isMainOrder) {
                    orderStore.updateStatusToOrderCancel(groupOrderId);
                }
                if (this.numberOfUsers > 1 && !this.isMainOrder) {
                    orderStore.deleteOrder(orderId);
                }
            }
        );
    }

    refreshOrder() {
        orderStore.getGroupOrdersByUserId(userStore.userId);
    }

    needToReloadOrders(groupFoodOrderId) {
        GroupOrderViewAPI.getInfoForGroupOrder(groupFoodOrderId).then(response => this.status = response.data.status);
        return this.fetchOrders.value.some(order => order.remainingTime === 0) || (this.status === ORDER_STATUS.SUBMITTED_TO_RESTAURANT.status);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    deleteIntervals() {
        clearInterval(this.interval);
    }

    filteredGroupOrders = computed(() => {
        return this.fetchOrders.value.filter(order => {
            const statusMatch = this.selectedStatus.value ? order.orderStatus === this.selectedStatus.value : true;
            const locationMatch = this.selectedLocation.value ? order.location === this.selectedLocation.value : true;
            const remainingTime = orderStore.remainingTimes[order.groupFoodOrderId] !== 0;
            var ratingMatch = false;
            //console.log("order.rating========="+order.rating+"====this.selectedRating.value :"+this.selectedRating.value);
            switch (this.selectedRating.value) {
                case RESTAURANT_RATING.RATING_5.rate:
                    if(order.rating == RESTAURANT_RATING.RATING_5.rate)
                    {ratingMatch = true;}
                    break;
                case RESTAURANT_RATING.RATING_4.rate:
                    if(RESTAURANT_RATING.RATING_4.rate <= order.rating && order.rating < RESTAURANT_RATING.RATING_5.rate)
                    {ratingMatch = true;}
                    break;
                case RESTAURANT_RATING.RATING_3.rate:
                    if(RESTAURANT_RATING.RATING_3.rate <= order.rating && order.rating < RESTAURANT_RATING.RATING_4.rate)
                    {ratingMatch = true;}
                    break;
                case RESTAURANT_RATING.RATING_2.rate:
                    if(RESTAURANT_RATING.RATING_2.rate <= order.rating && order.rating < RESTAURANT_RATING.RATING_3.rate)
                    {ratingMatch = true;}
                    break;
                case RESTAURANT_RATING.RATING_1.rate:
                    if(order.rating < RESTAURANT_RATING.RATING_2.rate)
                    {ratingMatch = true;}
                    break;
                default:
                    ratingMatch = true;
              }
            return statusMatch && locationMatch && ratingMatch && remainingTime;
        }).sort((a, b) => {
            const dateA = new Date(a.orderTime);
            const dateB = new Date(b.orderTime);
            return dateA < dateB ? 1 : -1;
        });
    });

    async getNumberOfOrdersJoined(groupOrderId, orderId) {
        const response = await GroupOrderViewAPI.getInfoForGroupOrder(groupOrderId);
        this.numberOfUsers = response.data.numberOfUsers;
        this.isMainOrder = response.data.mainOrderId === orderId;
    }
}
