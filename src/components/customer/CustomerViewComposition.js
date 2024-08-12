import {computed} from "vue";
import {cartStore, paymentStore, restaurantStore, uiStore} from "@/stores/stores";
import {STEPS} from "@/constants/applicationConstants";

export class CustomerViewComposition {

    constructor() {
        this.filteredSteps = computed(() => getFilteredSteps(Object.values(STEPS)));
        this.showRestaurant = computed(() => uiStore.getCurrentStep().id === STEPS.RESTAURANT.id);
        this.showMenu = computed(() => uiStore.getCurrentStep().id === STEPS.MENU.id);
        this.showPayment = computed(() => uiStore.getCurrentStep().id === STEPS.PAYMENT.id);
        this.showCart = computed(() => uiStore.getCurrentStep().id === STEPS.SUMMARY.id);
    }

    selectCurrentStep(step) {
        if (!paymentStore.paymentPending) {
            uiStore.setCurrentStep(step);
        } else {
            alert("Payment should finish first!!")
        }
    }

    isLastStep(index) {
        return index === this.filteredSteps.value.length - 1;
    }

}

function getFilteredSteps(steps) {
  if (uiStore.jointGroupOrderId !== null) {
      return filterStepsForJointOrder(steps);
  } else {
      return filterStepsForGroupOrder(steps);
  }
}

function filterStepsForGroupOrder(steps) {
    if (restaurantStore.getSelectedRestaurantId() === null) {
        return steps.filter(step => step.id === STEPS.RESTAURANT.id);
    } else if (!cartStore.showCart) {
        return steps.filter(step => step.id === STEPS.RESTAURANT.id || step.id === STEPS.MENU.id);
    } else if (!paymentStore.getPaymentRequired()) {
        return steps.filter(step => step.id !== STEPS.PAYMENT.id);
    } else {
        return steps;
    }
}

function filterStepsForJointOrder(steps) {
    if (!cartStore.showCart) {
        return steps.filter(step => step.id === STEPS.MENU.id);
    } else if (!paymentStore.getPaymentRequired()) {
        return steps.filter(step => step.id !== STEPS.PAYMENT.id && step.id !== STEPS.RESTAURANT.id);
    } else {
        return steps.filter(step => step.id !== STEPS.RESTAURANT.id);
    }
}


