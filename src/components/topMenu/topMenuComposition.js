import logoImage from '@/assets/images/logo.png';
import shoppingCart from '@/assets/images/shoppingCart.png';
import {computed} from "vue";
import {paymentStore, uiStore, userStore} from "@/stores/stores";
import routers from "@/routers/routers";
import {APPLICATION_VIEWS, STEPS} from "@/constants/applicationConstants";


export class TopMenuComposition {
    constructor() {
        this.userName =  computed(() => userStore.name);
        this.userRole =  computed(() => userStore.role);
        // Computed property to check if user is logged in
        this.isLoggedIn = computed(() => !!this.userName.value);
    }

    get logoImage() {
        return logoImage;
    }

    get shoppingCartImage() {
        return shoppingCart;
    }

    logOut() {
        if (!paymentStore.paymentPending) {
            userStore.logOutUser();
            routers.push('/');
        } else {
            alert("Payment hasn't finished!!")
        }
    }

    showCart() {
        if (!paymentStore.paymentPending) {
            uiStore.setActiveView(APPLICATION_VIEWS.CUSTOMER_VIEW);
            uiStore.setCurrentStep(STEPS.SUMMARY);
        } else {
            alert("Payment should finish first!!")
        }
    }

}
