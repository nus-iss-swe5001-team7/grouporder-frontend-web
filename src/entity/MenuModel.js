
export class MenuModel {
    constructor(config) {
        config = config || {};
        this.id = config.id;
        this.menuName = config.menuName;
        this.menuPrice = config.menuPrice;
        this.menuImageURL = config.menuImageURL;
        this.category = config.category || null;
        this.description = config.description || null;
        this.restaurantId = config.restaurant.id;
    }
}