import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response?.data) {
        const errors = response?.data?.errors;
        if (errors && errors[0]) {
            const error = new Error(errors[0].message);
            error.status = 400;
            throw error;
        }
        return response?.data?.data;
    }
    return response;
}, (error) => {
    console.log(error.response);
    if (!error?.response) {
        throw new Error("Lỗi mạng");
    }
    const errors = error?.response?.data?.errors;
    if (errors && errors[0]) throw new Error(errors[0].message);
    throw error;
});

export default axiosClient;