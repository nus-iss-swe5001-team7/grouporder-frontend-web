
export class MenuModel {
    constructor(config) {
        config = config || {};
        this.id = config.id;
        this.menuName = config.menuName;
        this.menuPrice = config.menuPrice;
        this.menuImageURL = config.menuImageURL|| null;
        this.category = config.category || null;
        this.description = config.description || null;
        this.preferences = config.preferences || null;
    }
}
