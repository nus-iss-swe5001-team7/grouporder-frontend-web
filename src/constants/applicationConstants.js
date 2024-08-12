export const USER_ROLES = {
    CUSTOMER: 'customer',
    RESTAURANT: 'restaurant',
    DELIVERY: 'delivery'
};

export const APPLICATION_VIEWS = {
    CUSTOMER_VIEW: {
        id: 'customer_view',
        name: 'Order Food',
        userAccessRole: USER_ROLES.CUSTOMER
    },
    RESTAURANT_VIEW: {
        id: 'restaurant_view',
        name: 'Restaurant View',
        userAccessRole: USER_ROLES.RESTAURANT
    },
    DELIVERY_VIEW: {
        id: 'delivery_view',
        name: 'Delivery View',
        userAccessRole: USER_ROLES.DELIVERY
    },
    CUSTOMER_ORDERS_VIEW: {
        id: 'customer_order_view',
        name: 'My Orders',
        userAccessRole: USER_ROLES.CUSTOMER
    },
    GROUP_ORDERS_VIEW: {
        id: 'group_order_view',
        name: 'Join Group Orders',
        userAccessRole: USER_ROLES.CUSTOMER
    }
};

export const ORDER_STATUS = {
    PENDING_USER_JOIN: {
        status:'PENDING_USER_JOIN',
        description : "Your order has been created, please wait for other customer to join."
    },
    ORDER_CANCEL:  {
        status:'ORDER_CANCEL',
        description : "Your order is cancelled."
    },
    SUBMITTED_TO_RESTAURANT: {
        status:'SUBMITTED_TO_RESTAURANT',
        description : "Your order has been submitted to restaurant."
    },
    KITCHEN_PREPARING: {
        status:'KITCHEN_PREPARING',
        description : "The restaurant is preparing your food."
    },
    READY_FOR_DELIVERY:{
        status:'READY_FOR_DELIVERY',
        description : "Your order is ready for delivery."
    }, 
    ON_DELIVERY: {
        status:'ON_DELIVERY',
        description : "Your order is on delivery."
    },
    DELIVERED: {
        status:'DELIVERED',
        description : "Your order is delivered."
    }
};
export const STEPS = {
    RESTAURANT: {
        id: 'restaurant',
        name: 'Restaurant'
    },
    MENU: {
        id: 'menu',
        name: 'Menu'
    },
    SUMMARY: {
        id: 'summary',
        name: 'Summary'
    },
    PAYMENT: {
        id: 'payment',
        name: 'Payment'
    }
};

export const RESTAURANT_LOCATIONS = {
    South: {
        name: 'South'
    },
    Central: {
        name: 'Central'
    },
    West: {
        name: 'West'
    },
    North: {
        name: 'North'
    },
    East: {
        name: 'East'
    }
};

export const RESTAURANT_RATING = {
    RATING_5: {
        rate: 5
    },
    RATING_4: {
        rate: 4
    },
    RATING_3: {
        rate: 3
    },
    RATING_2: {
        rate: 2
    },
    RATING_1: {
        rate: 1
    }
};