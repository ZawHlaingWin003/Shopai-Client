import axios from 'axios';

// let SERVERAPI = "https://admin.rcepmall.net/"

// if (process.env.NODE_ENV === "development") {
//     SERVERAPI = 'http://192.168.0.139/';
// }
// localStorage.setItem("baseUrl", SERVERAPI);

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// const token = window.localStorage.getItem("API_TOKEN");
// if (token) {
//     instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('API_TOKEN');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default instance;
