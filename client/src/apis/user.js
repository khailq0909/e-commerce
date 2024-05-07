import axios from '../axios';

export const apiLogin = (data) =>axios({
    url:'/auth/login',
    method:'post',
    data: data,
    withCredentials: true
})

export const apiLogout = () =>axios({
    url:'/auth/logout',
    method:'post',
    withCredentials: true
})