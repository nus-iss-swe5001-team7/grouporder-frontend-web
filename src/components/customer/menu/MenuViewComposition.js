import {cartStore, menuStore, restaurantStore} from "@/stores/stores";
import {computed} from "vue";


export class MenuViewComposition {

    constructor() {
        this.menus = getMenusFromRestaurant();
        this.cartItems = computed(()=> cartStore.getCart());
        this.selectedPreferences = this.getPreferences();
    }

    getPreferences() {

        let selectedPreferences = {};
        this.cartItems.value.forEach(cartItem => {
            const preferences = cartItem.preferences || {};
            if (!selectedPreferences[cartItem.menuId]) {
                selectedPreferences[cartItem.menuId] = {};
            }
            Object.keys(preferences).forEach(preferenceType => {
                selectedPreferences[cartItem.menuId][preferenceType] = preferences[preferenceType];
            });
        })
        return selectedPreferences;

    }

    initReference(menu) {
        if (!this.selectedPreferences[menu.id]) {
            this.selectedPreferences[menu.id] = {};
        }

        if (menu.preferences) {

            Object.keys(menu.preferences).forEach(preferenceType => {

                if (this.selectedPreferences[menu.id] && !this.selectedPreferences[menu.id][preferenceType]) {
                    this.selectedPreferences[menu.id][preferenceType] = '';
                }
            });
        }
    }

    formatPreferenceType(preferenceType) {
        return preferenceType
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    formatOption(option) {
        return option.charAt(0).toUpperCase() + option.slice(1).toLowerCase();
    }

    addToCart(menu) {
        this.initReference(menu);
        const menuWithPreferences = {
            menu: menu,
            preferences: this.selectedPreferences[menu.id] || {}
        };

        cartStore.addToCart(menuWithPreferences);
    }

    checkout() {
        const hasIncompleteSelection = this.cartItems.value.some(cartItem => {

            if (cartItem.preferences) {

                for (let preferenceType in cartItem.preferences) {
                    if (!cartItem.preferences[preferenceType]) {
                        return true;
                    }
                }
            }
            return false;
        });

        if (hasIncompleteSelection) {
            alert('Please select all preferences for your items before proceeding.');
            return;
        }

        this.mergeCartItems();

        cartStore.checkout();

    }

    mergeCartItems() {

        const mergedItems = new Map();

        this.cartItems.value.forEach(cartItem => {
            if (cartItem.menuId && cartItem.preferences) {

                const preferencesKey = JSON.stringify(cartItem.preferences);

                const uniqueKey = `${cartItem.menuId}_${preferencesKey}`;

                if (mergedItems.has(uniqueKey)) {

                    mergedItems.get(uniqueKey).quantity += cartItem.quantity;
                } else {

                    mergedItems.set(uniqueKey, { ...cartItem });
                }
            }
        });

        cartStore.cartItems = Array.from(mergedItems.values());
    }

    getQuantity(menu) {
        return computed(() => {
            return this.cartItems.value
                .filter(item => item.menuId === menu.id)
                .reduce((total, item) => total + item.quantity, 0);
        });
    }

    removeItem(menu) {
        cartStore.removeItem(menu.id);

        const menuExistsInCart = this.cartItems.value.some(item => item.id === menu.id);

        if (!menuExistsInCart) {
            this.selectedPreferences[menu.id] = {};
        }
    }

    addItem(menu) {
        Object.keys(this.selectedPreferences[menu.id]).forEach(preferenceType => {
            this.selectedPreferences[menu.id][preferenceType] = '';
        });
        this.addToCart(menu);
    }

}

function getMenusFromRestaurant() {
    return menuStore.retrieveMenu(restaurantStore.getSelectedRestaurantId());
}
