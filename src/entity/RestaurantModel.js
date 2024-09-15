import {MenuModel} from "@/entity/MenuModel";

export class RestaurantModel {
    constructor(config) {
        config = config || {};
        this.id = config.id;
        this.restaurantName = config.restaurantName || null;
        this.location = config.location;
        this.rating = config.rating;
        this.restaurantImgURL = config.restaurantImgURL;
        this.cuisineType = config.cuisineType;
        this.menus = config.menus ? config.menus.map(menu => new MenuModel(menu)) : [];
    }
}
