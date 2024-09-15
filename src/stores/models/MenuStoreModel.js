import {restaurantStore} from "@/stores/stores";

export class MenuStoreModel {
    constructor() {
        this.allMenus = [];
    }

    retrieveMenu(restaurantId) {
        return restaurantId ? restaurantStore.getRestaurantById(restaurantId).menus : [];
    }

    getAllMenus() {
        return this.allMenus;
    }

    getItemUrl(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuImageURL;
    }

    getUnitPrice(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuPrice;
    }
}
