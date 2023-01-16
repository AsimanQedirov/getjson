import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {deleteCookie, getCookie} from "cookies-next";
import {axiosBaseQuery} from "../query/config.api";

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    const token = getCookie('access_token');
    if (token) {
        config.headers['Authorization'] = `bearer ${token}`;
    }
    return config
}, (error) => {

    return Promise.reject(error)
});
axios.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error) => {
    if (!error.response) {
        console.log('Connection error');
        return Promise.reject(error)
    }
    const status = error.response.status;
    if (status === 401) {
        deleteCookie('access_token');
        window.location.href = '/';
        // axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`)
        //     .then(res=>{
        //         console.log(res);
        //         // debugger;
        //     })
    }
    return Promise.reject(error)
})

