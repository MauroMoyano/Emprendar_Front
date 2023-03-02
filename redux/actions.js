import axios from "axios"

export const CURRENT_PAGE = "CURRENT_PAGE"
export const GET_HOME_PROJECTS = "GET_HOME_PROJECTS"
export const GET_DETAIL_PROJECT = "GET_DETAIL_PROJECT"
export const RESET_DETAIL_PROJECT = " RESET_DETAIL_PROJECT"
export const GET_USER = " GET_USER "
export const ORDER_TOP = "ORDER_TOP"

// const BACK_APP_URL = process.env.BACK_APP_URL

export const getHomeProjects = () => {
    return async function (dispatch) {
        const {data} = await axios.get("http://localhost:3001/project/")
        dispatch({type: GET_HOME_PROJECTS, payload: data})
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

export const filterCategory = () => {

}

export const resetDetailProject = (id) => {
    return {
        type: RESET_DETAIL_PROJECT
    }
}