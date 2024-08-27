import axios from 'axios';

export default () => {
    var stagingAPI = process.env.VUE_APP_STAGING_API;
    var url;

    if (stagingAPI) {
        url = stagingAPI
    } else {
        url = 'http://localhost:8765';
    }
    // console.log(url);
    return axios.create({
        baseURL: url
        //baseURL: 'http://localhost:8765/'
    });
};
