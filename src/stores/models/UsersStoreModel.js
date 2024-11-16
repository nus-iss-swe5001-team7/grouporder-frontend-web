import UserAPI from "@/services/api/userAPI";
import {APPLICATION_VIEWS, STEPS, USER_ROLES} from "@/constants/applicationConstants";
import {cartStore, restaurantStore, uiStore} from "@/stores/stores";
export class UsersStoreModel {
    constructor() {
        this.init();
    }

    init() {
        this.authorized = false;
        this.userId = null;
        this.name = "";
        this.role = "";
        this.customerLocation = '';
        this.customerAddress = '';
    }

    setAuthenticated(data) {
        this.authorized = true;
        this.userId = data.userId;
        this.name = data.name;
        this.role = data.role;
        this.setActiveView();
    }

    setActiveView() {
        if (this.isRestaurant()) {
            uiStore.setActiveView(APPLICATION_VIEWS.RESTAURANT_VIEW);
        }
        if (this.isDelivery()) {
            uiStore.setActiveView(APPLICATION_VIEWS.DELIVERY_VIEW);
        }
        if (this.isCustomer()) {
            uiStore.setActiveView(APPLICATION_VIEWS.CUSTOMER_VIEW);
        }
    }

    getAuthorized() {
        return this.authorized;
    }

    getUserId() {
        return this.userId;
    }

    registerUser(user) {
        const data = user.toRest();
        return UserAPI.createUser(data);
    }

    logOutUser() {
        const token = localStorage.getItem('jwtToken');
        UserAPI.logoutUser(token)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data); // "User successfully logged out"
                    // Perform logout operations here, e.g., clearing user data
                    this.init(); // Reset user store to initial state
                    cartStore.init();
                    restaurantStore.setSelectedRestaurantId(null);
                    uiStore.setCurrentStep(STEPS.RESTAURANT);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error.response.data.message); // "User not found"
                    // Handle user not found error
                } else {
                    // Handle other errors
                    console.log("An error occurred during the logout process.");
                }
            });
    }

    loginUser(user) {
        const data = user.toRest();
        return UserAPI.loginUser(data);
    }

    isCustomer() {
        return this.role === USER_ROLES.CUSTOMER;
    }

    isRestaurant() {
        return this.role === USER_ROLES.RESTAURANT;
    }

    isDelivery() {
        return this.role === USER_ROLES.DELIVERY;
    }
    isUserAllowed(allowedUserRole) {
        switch (allowedUserRole) {
            case USER_ROLES.CUSTOMER:
                return this.isCustomer();
            case USER_ROLES.RESTAURANT:
                return this.isRestaurant();
            case USER_ROLES.DELIVERY:
                return this.isDelivery();
            default:
                return false;
        }
    }
}

