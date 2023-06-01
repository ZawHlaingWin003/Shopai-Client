import axios from "axios"

window.axios = axios

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://localhost:8000";


// axios.interceptors.request.use(config => {
//     const token = localStorage.getItem('API_TOKEN');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

const token = window.localStorage.getItem("API_TOKEN");
if (token) {
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


export default axios;