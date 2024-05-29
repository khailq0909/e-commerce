import axios from "../axios"
export const apiGetAllCategories = (param) => axios({
    url:`/category?${param}`,
    method:'get',
    withCredentials: true,
})