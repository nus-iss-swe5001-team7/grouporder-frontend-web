import {cartStore, menuStore, restaurantStore, uiStore} from "@/stores/stores";
import {computed} from "vue";
import {STEPS} from "@/constants/applicationConstants";


export class MenuViewComposition {

    constructor() {
        this.menus = getMenusFromRestaurant();
        this.cartItems = computed(()=> cartStore.getCart());
    }

    addToCart(menu) {
        cartStore.addToCart(menu);
    }

    checkout() {
        cartStore.checkout();
        uiStore.setCurrentStep(STEPS.SUMMARY);
    }

    getQuantity(menu) {
        const findIndex = this.cartItems.value.findIndex(cartItem => cartItem.menuId === menu.id);
        if (findIndex !== -1) {
            return this.cartItems.value[findIndex].quantity;
        } else {
            return 0;
        }
    }

    removeItem(menu) {
        cartStore.removeItem(menu.id);
    }

    addItem(menu) {
        cartStore.addItem(menu.id);
    }

}

function getMenusFromRestaurant() {
    return menuStore.retrieveMenu(restaurantStore.getSelectedRestaurantId());
}
