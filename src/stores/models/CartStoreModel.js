import {menuStore, restaurantStore, uiStore} from "@/stores/stores";
import {CartCaretaker} from "@/stores/memento/CartCareTaker";
import {CartMemento} from "@/stores/memento/CartMemento";
import {STEPS} from "@/constants/applicationConstants";

export class CartStoreModel {
    constructor() {
        this.init();
    }

    init() {
        this.cartItems = [];
        this.showCart = false;
        this.promoStatus = false;
        this.discountedTotalPrice = 0;
        this.caretaker = new CartCaretaker();
        this.caretaker.clearMemento();
    }

    addToCart(menuWithPreferences) {
        const { menu, preferences } = menuWithPreferences;


        const existingItemIndex = this.cartItems.findIndex(item => item.menuId === menu.id && JSON.stringify(item.preferences) === JSON.stringify(preferences));

        if (existingItemIndex === -1) {
            this.cartItems.push({
                menuId: menu.id,
                menuImageURL: menu.menuImageURL,
                name: menu.menuName,
                quantity: 1,
                price: menu.menuPrice,
                preferences: preferences
            });
        } else {
            this.cartItems[existingItemIndex].quantity++;
            this.cartItems[existingItemIndex].price += menu.menuPrice;
        }

        if (!this.hasPreferenceUnselected(this.cartItems)) {
            this.showCart = true;
            this.saveState();
        } else {
            this.showCart = false;
        }

    }

    hasPreferenceUnselected(cartItems) {
        return cartItems.some((item) => {
            if (item.preferences) {
                return Object.keys(item.preferences).some(preferenceType => {
                    return item.preferences[preferenceType] == null || item.preferences[preferenceType] === '';
                });
            }
            return false;
        })
    }

    removeItem(itemMenuId, itemPreferences) {
        let existingItemIndex;
        if (itemPreferences !== undefined) {
            existingItemIndex = this.cartItems.findIndex(item =>
                item.menuId === itemMenuId && item.preferences === itemPreferences
            );
        } else {
            existingItemIndex = this.cartItems.findIndex(item => item.menuId === itemMenuId);
        }

        if (this.cartItems[existingItemIndex].quantity === 1) {
            this.cartItems.splice(existingItemIndex, 1);
        } else {
            this.cartItems[existingItemIndex].quantity--;
            this.cartItems[existingItemIndex].price -= menuStore.getUnitPrice(itemMenuId);
        }
        this.saveState();
    }

    addItem(itemMenuId, itemPreferences) {
        let existingItemIndex;
        if (itemPreferences !== undefined) {
            existingItemIndex = this.cartItems.findIndex(item =>
                item.menuId === itemMenuId && item.preferences === itemPreferences
            );
        } else {
            existingItemIndex = this.cartItems.findIndex(item => item.menuId === itemMenuId);
        }

        this.cartItems[existingItemIndex].quantity++;
        this.cartItems[existingItemIndex].price += menuStore.getUnitPrice(itemMenuId);

        this.saveState();
    }

    setCart(value) {
        this.cartItems = value;
    }
    getCart() {
        return this.cartItems;
    }

    checkout() {
        this.showCart = this.cartItems.length > 0;
        uiStore.setCurrentStep(STEPS.SUMMARY);
    }

    getTotalPrice() {
        return this.cartItems.reduce((total, cartItem) => {
            return total + cartItem.price;
        }, 0);
    }

    getDiscountedTotalPrice() {
        return this.discountedTotalPrice;
    }

    setDiscountedTotalPrice(newTotalPrice) {
        this.discountedTotalPrice = newTotalPrice;
    }

    saveState() {
        this.promoStatus = false;
        const memento = new CartMemento(
            JSON.parse(JSON.stringify(this.cartItems)),
            this.showCart,
            this.discountedTotalPrice
        );
        this.caretaker.addMemento(memento);
    }

    restoreFromMemento(index) {
        const memento = this.caretaker.getMemento(index);
        if (memento) {
            this.cartItems = JSON.parse(JSON.stringify(memento.cartItems));
            this.showCart = memento.showCart;
            this.discountedTotalPrice = memento.discountedTotalPrice;
        } else {
            this.init();
            restaurantStore.selectedRestaurantId = null;
        }
    }

    undo() {
        if (this.caretaker.mementos.length  > 0) {
            this.caretaker.mementos.pop();
            const previousMementoIndex = this.caretaker.mementos.length - 1;
            this.restoreFromMemento(previousMementoIndex);
        }
        this.promoStatus = false;
    }

}
