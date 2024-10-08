import {restaurantStore} from "@/stores/stores";

export class MenuStoreModel {

    retrieveMenu(restaurantId) {
        return restaurantId ? restaurantStore.getRestaurantById(restaurantId).menus : [];
    }

    getItemUrl(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuImageURL;
    }

    getUnitPrice(itemId) {
        return this.allMenus.find(menu => menu.id === itemId).menuPrice;
    }
}
