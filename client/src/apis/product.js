import axios from "../axios";

export const apiGetAllProducts = (params) => axios({
    url:'/product/find-products',
    method:'get',
    withCredentials: true,
    params
})