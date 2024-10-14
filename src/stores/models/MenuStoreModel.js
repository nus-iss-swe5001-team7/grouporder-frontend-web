import {restaurantStore} from "@/stores/stores";

export class MenuStoreModel {
    constructor() {
        this.allMenus = [];
    }

    retrieveMenu(restaurantId) {
        return restaurantId ? restaurantStore.getRestaurantById(restaurantId).menus : [];
    }

    getItemUrl(itemId) {
        console.log("getItemUrl :=== menuId: " + itemId);
        console.log("this.allMenus.find(menu => menu.id === itemId): " + this.allMenus.find(menu => menu.id === itemId));
        return this.allMenus.find(menu => menu.id === itemId).menuImageURL;
    }

    getUnitPrice(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuPrice;
    }
}
