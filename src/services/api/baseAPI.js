import axios from 'axios';

export default () => {
    var stagingAPI = process.env.VUE_APP_STAGING_API;
    const token = localStorage.getItem('jwtToken');
    var url;

    if (stagingAPI) {
        url = stagingAPI
    } else {
        // url = 'http://localhost:8765/';
        url = 'https://d1tdd75mfyl36s.cloudfront.net/';
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
