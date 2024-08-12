export class OrderModel {
    constructor(config) {
        config = config || {};

        this.id = config.id || null;
        this.groupFoodOrderId = config.groupFoodOrderId || null;
        this.userId = config.userId || null;
        this.createdTime = config.createdTime || null;
        this.orderDetails = config.orderDetails || null;
        this.restaurantId = config.restaurantId || null;
        this.location = config.location || null;
        this.deliveryFee = config.deliveryFee || null;
    }

    toRest() {
        return {
            id: this.id,
            groupFoodOrderId: this.groupFoodOrderId,
            restaurantId: this.restaurantId,
            userId: this.userId,
            createdTime: this.createdTime,
            orderDetails: this.orderDetails,
            location: this.location,
            deliveryFee: this.deliveryFee
        };
    }

}