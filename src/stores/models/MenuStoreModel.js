import {restaurantStore} from "@/stores/stores";

export class MenuStoreModel {
    constructor() {
        this.allMenus = [];
    }

    retrieveMenu(restaurantId) {
        if (restaurantId) {
            this.allMenus = restaurantStore.getRestaurantById(restaurantId).menus;
        }
        return this.allMenus;
    }

    getUnitPrice(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuPrice;
    }
}
