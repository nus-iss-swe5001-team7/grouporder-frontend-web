import {orderStore, userStore} from '@/stores/stores';
import {ref, computed, onMounted, onUnmounted} from 'vue';
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

    getTimer(groupFoodOrderId) {
        orderStore.getTimerForGroupOrder(groupFoodOrderId);
        return this.formatTime(orderStore.remainingTimes[groupFoodOrderId]);
    }

    refreshOrder() {
        orderStore.getGroupOrdersByUserId(userStore.userId);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startTimers() {
        this.timerInterval = setInterval(async () => {
            for (const groupFoodOrderId of Object.keys(orderStore.remainingTimes)) {
                await orderStore.getTimerForGroupOrder(groupFoodOrderId);
                if (this.needToReloadOrders(groupFoodOrderId)) {
                    await orderStore.getGroupOrdersByUserId(userStore.userId);
                    delete orderStore.remainingTimes[groupFoodOrderId];
                }
            }
        }, 1000);
    }

    needToReloadOrders(groupFoodOrderId) {
        GroupOrderViewAPI.getInfoForGroupOrder(groupFoodOrderId).then(response => this.status = response.data.status);

        return orderStore.remainingTimes[groupFoodOrderId] === 0 || (this.status === ORDER_STATUS.SUBMITTED_TO_RESTAURANT.status);
    }

    deleteIntervals() {
        clearInterval(this.timerInterval);
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
