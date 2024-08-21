import Api from "@/services/api/baseAPI";

const USER = '/user-service/user/register';
const LOGIN = '/user-service/user/login'
export default {
    createUser: (user) => Api().post(USER, user),
    loginUser: (user) => Api().post(LOGIN, user),
    // Add logout method
    logoutUser: (username) => Api().post('/logout', { name: username }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [(data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        }]
    })
};
