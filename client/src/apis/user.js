import axios from '../axios';

export const apiLogin = (data) =>axios({
    url:'/auth/login',
    method:'post',
    data: data,
    withCredentials: true
})

export const apiRegister = (data) =>axios({
    url:'/auth/register',
    method:'post',
    data: data,
    withCredentials: true
})

export const apiLogout = () =>axios({
    url:'/auth/logout',
    method:'post',
    withCredentials: true
})

export const apiSendOTP = (data) =>axios({
    url:'/auth/send-reset-token',
    method:'post',
    data: data,
    withCredentials: true
})
export const apiCheckOTP = (data) =>axios({
    url:'/auth/check-otp',
    method:'post',
    data: data,
    withCredentials: true
})
export const apiChangePassword = (data) =>axios({
    url:'/auth/reset-password',
    method:'put',
    data: data,
    withCredentials: true
})