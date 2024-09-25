// src/Config/Api.js

import axios from 'axios';

// Đặt URL cơ sở của API
const API_BASE_URL = 'http://127.0.0.1:8000/';

// Tạo axios instance với URL cơ sở
const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Thời gian chờ (ms)
    headers: { 'Content-Type': 'application/json' }
});

// Định nghĩa các endpoints của API
const Api = {
    destinations: 'destinations/', // Endpoint cho danh sách điểm đến
    tours: 'tours/',
    faqs: 'faqs/',
    detail: (Id) => `/tours/${Id}`,
    reviews: '/reviews/',
    login: '/o/token/',
    CurrentUser: '/users/current/',
    register: 'register/',
    updateUser: `/users/profile/`,
    createPayment: () => '/payment/create/',


    // Thêm các endpoints khác nếu cần
};



export { apiInstance, Api };
