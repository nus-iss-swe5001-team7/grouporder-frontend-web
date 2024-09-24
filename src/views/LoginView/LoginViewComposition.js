import {computed, onMounted, ref, watch} from "vue";
import {UserModel} from "@/entity/UserModel";
import {restaurantStore, userStore} from "@/stores/stores.js";
import routers from "@/routers/routers";


export class LoginViewComposition {


    constructor() {
        this.name = ref(null);
        this.password = ref(null);
        this.email = ref(null);
        this.role = ref(null);
        this.rePassword = ref(null);
        this.errorMessage = ref(null);

        this.validEmail = ref(true);
        this.registerOrLogin = ref('Register');
        this.hasAccount = ref(false);
        this.isRegisterButtonEnabled = computed(() => this.getButtonEnabledStatus())
        watch(this.rePassword, () => this.verifyPassword());
        watch(this.password, () => this.verifyPassword());

        onMounted(() => {
            window.addEventListener('popstate', this.handlePopState());

            // Don't forget to remove the event listener when the component is unmounted
            return () => {
                window.removeEventListener('popstate', this.handlePopState());
            };
        });
    }

    clearContent() {
        this.password.value = null;
        this.email.value = null;
    }

    handlePopState() {
        if (userStore.name !== '') {
            userStore.logOutUser();
        }
    }

    registerUser() {
        const user = new UserModel();
        user.name = this.name.value;
        user.password = this.password.value;
        user.email = this.email.value;
        user.role = this.role.value;

        if (!this.hasAccount.value) {
            userStore.registerUser(user).then(response => {
                userStore.setAuthenticated(response.data);
                localStorage.setItem('jwtToken', response.data.token);
                restaurantStore.init();
                routers.push('/main');
            }).catch(error => alert(error.response.data));
        } else {
            userStore.loginUser(user).then(response => {
                userStore.setAuthenticated(response.data);
                localStorage.setItem('jwtToken', response.data.token);
                restaurantStore.init();
                routers.push('/main');
            }).catch(error => alert(error.response.data));
        }
    }

    passwordVerified() {
        return (!this.hasAccount.value && this.password.value === this.rePassword.value) || this.hasAccount.value;
    }

    verifyPassword() {
        if (!this.passwordVerified()) {
            this.errorMessage.value = "Passwords do not match!";
        } else {
            this.errorMessage.value = null;
        }
    }

    getButtonEnabledStatus() {
        if (!this.hasAccount.value) {
            return this.name.value !== null && this.name.value !== '' && this.passwordVerified() && this.validEmail.value && this.email.value !== null &&
                this.password.value !== '' && this.password.value !== null && this.rePassword.value !== null && this.role.value !== null;
        } else {
            return this.validEmail.value && this.email.value !== null && this.password.value !== null;
        }
    }

    toggleToLogin() {
       this.hasAccount.value = true;
        this.clearContent();
       this.registerOrLogin.value = "Login";
    }

    toggleToRegister() {
        this.hasAccount.value = false;
        this.clearContent();
        this.registerOrLogin.value = "Register";
    }

    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.validEmail.value = emailRegex.test(this.email.value);
    }
}
