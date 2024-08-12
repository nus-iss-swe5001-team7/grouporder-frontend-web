import MenuAPI from "@/services/api/menuAPI";
import {MenuModel} from "@/entity/MenuModel";

export class MenuStoreModel {
    constructor() {
        this.allMenus = [];
        this.init();
    }

    init(){
        MenuAPI.getAllMenus().then(response => this.allMenus = generateMenuModels(response.data));
    }

    retrieveMenu(restaurantId) {
        return restaurantId ? this.allMenus.filter(menu => menu.restaurantId === restaurantId) : [];
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

function generateMenuModels(menuDataList) {
    return menuDataList.map(menuData => new MenuModel(menuData));
}