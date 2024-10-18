import Api from "@/services/api/baseAPI";

const USER = '/user/register';
const LOGIN = '/user/login';
const LOGOUT = '/user/logout';
export default {
    createUser: (user) => Api().post(USER, user),
    loginUser: (user) => Api().post(LOGIN, user),
    logoutUser: () => Api().post(LOGOUT, {})
};
