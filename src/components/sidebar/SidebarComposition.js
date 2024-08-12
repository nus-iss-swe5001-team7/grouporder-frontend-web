
import {APPLICATION_VIEWS, STEPS} from '@/constants/applicationConstants';
import {orderStore, paymentStore} from '@/stores/stores';
import {uiStore, userStore} from '@/stores/stores';
import {orderListStore} from '@/stores/stores';

export class SidebarComposition {
    
    
    constructor() {
        this.applicationViews = getValidApplicationViews();
    }

    getGroupOrdersByUserId()  {
        if (!paymentStore.paymentPending) {
            orderStore.getGroupOrdersByUserId(userStore.userId);
        } else {
            alert("Payment should finish first!!")
        }
    }

    getAllGroupOrders()  {
        if (!paymentStore.paymentPending) {
            orderListStore.getAllGroupOrders();
        } else {
            alert("Payment should finish first!!")
        }
    }

    getOrdersForRestaurantStaff() {
        orderListStore.getOrdersForRestaurantStaff(userStore.userId);
    }

    getOrdersForDeliveryStaff(location) {
        orderListStore.getOrdersForDeliveryStaff(userStore.userId, location);
    }

    selectView(appView) {
        if (!paymentStore.paymentPending) {
            uiStore.setActiveView(appView);
            uiStore.setCurrentStep(STEPS.RESTAURANT);
        } else {
            alert("Payment should finish first!!")
        }

    }

}

function getValidApplicationViews() {
    return Object.values(APPLICATION_VIEWS).filter(view => userStore.isUserAllowed(view.userAccessRole));
}
