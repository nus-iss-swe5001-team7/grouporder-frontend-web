import Api from "@/services/api/baseAPI";

const USER = '/user-service/user/register';
const LOGIN = '/user-service/user/login';
const LOGOUT = '/user-service/user/logout';
export default {
    createUser: (user) => Api().post(USER, user),
    loginUser: (user) => Api().post(LOGIN, user),
    logoutUser: () => Api().post(LOGOUT, {})
};
