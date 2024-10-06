import {restaurantStore} from "@/stores/stores";
import MenuAPI from "@/services/api/menuAPI";
import {MenuModel} from "@/entity/MenuModel";

export class MenuStoreModel {
    constructor() {
        this.allMenus = [];
        // this.init();
    }

    init(){
        MenuAPI.getAllMenus().then(response => this.allMenus = generateMenuModels(response.data));
    }

    retrieveMenu(restaurantId) {
        return restaurantId ? restaurantStore.getRestaurantById(restaurantId).menus : [];
    }

    getAllMenus() {
        return this.allMenus;
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

function generateMenuModels(menuDataList) {
    return menuDataList.map(menuData => new MenuModel(menuData));
}