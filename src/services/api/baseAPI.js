import axios from 'axios';

export default () => {
    var stagingAPI = process.env.VUE_APP_STAGING_API;
    const token = localStorage.getItem('jwtToken');
    var url;

    if (stagingAPI) {
        url = stagingAPI
    } else {
        // url = 'http://localhost:8765/';
        url = 'http://group-order-lb-621478777.ap-southeast-1.elb.amazonaws.com';
    }
    // console.log(url);
    return axios.create({
        baseURL: url,
        // baseURL: 'http://localhost:8765/'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Set JWT token in Authorization header
        }
    });
};
