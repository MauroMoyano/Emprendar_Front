import axios from "axios"

export const CURRENT_PAGE = "CURRENT_PAGE"
export const GET_HOME_PROJECTS = "GET_HOME_PROJECTS"
export const GET_DETAIL_PROJECT = "GET_DETAIL_PROJECT"
export const RESET_DETAIL_PROJECT = " RESET_DETAIL_PROJECT"
export const GET_USER = " GET_USER "
export const ORDER_TOP = "ORDER_TOP"
export const FILTER_CATEGORY = "FILTER_CATEGORY"
export const FILTER_COUNTRY = "FILTER_COUNTRY"

// const BACK_APP_URL = process.env.BACK_APP_URL

export const getHomeProjects = () => {
    return async function (dispatch) {
        const {data} = await axios.get("http://localhost:3001/project/")
        const category = await axios.get("http://localhost:3001/category")
        console.log("categorias ", category.data)
        dispatch({type: GET_HOME_PROJECTS, payload: {data, category}})
    }
}

export const currentPageHandler = (value) => {
    return {type: CURRENT_PAGE, payload: value}
}

export const getDetailProject = (id) => {
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/project/${id} `)
        dispatch({type: GET_DETAIL_PROJECT, payload: data})
    }
}

export const getUser = (id) => {
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/user/${id} `)
        dispatch({type: GET_USER, payload: data})
    }
}

export const orderTop = (value) => {
    return {type: ORDER_TOP, payload: value}
}

export const filterCategory = (value) => {
    return {type: FILTER_CATEGORY, payload: value}
}

export const filterCountry = (value)=>{
    return {type: FILTER_COUNTRY, payload: value}
}

export const resetDetailProject = (id) => {
    return {
        type: RESET_DETAIL_PROJECT
    }
}