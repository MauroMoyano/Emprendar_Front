// import { Sansita } from 'next/font/google'
import {
    CURRENT_PAGE,
    GET_HOME_PROJECTS,
    GET_DETAIL_PROJECT,
    RESET_DETAIL_PROJECT,
    GET_USER,
    ORDER_TOP,
    FILTER_CATEGORY,
    FILTER_COUNTRY
} from './actions'

const initialState = {

    allProjects: [],
    allProjectsCopy: [],
    detailUsuario: {},
    detailProject: {
        name: "fakedata"
    },
    userProjects: [],
    category: [],
    country: [],
    dashAdmin: {projects: [], users: []},
    currentPage: 0


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_HOME_PROJECTS:
            // console.log("action dentro de get home " + JSON.stringify(Object.keys(action.payload)))
            return {
                ...state,
                allProjects: action.payload.data,
                allProjectsCopy: action.payload.data,
                currentPage: 0,
                // category: action.payload.category
    }

case
    CURRENT_PAGE:
        return {...state, currentPage: action.payload}

case
    GET_DETAIL_PROJECT :
        return {
            ...state, detailProject: action.payload
        }
case
    RESET_DETAIL_PROJECT :
        return {
            ...state, detailProject: {}
        }
case
    GET_USER :
        return {
            ...state, detailUsuario: action.payload
        }
case
    ORDER_TOP:
        return {
            ...state, allProjects: (action.payload === 'Ascendente')
                ? [...state.allProjects.sort((a, b) => a.amount_collected - b.amount_collected)]
                : [...state.allProjects.sort((a, b) => b.amount_collected - a.amount_collected)],
            allProjectsCopy: (action.payload === 'Ascendente')
                ? [...state.allProjects.sort((a, b) => a.amount_collected - b.amount_collected)]
                : [...state.allProjects.sort((a, b) => b.amount_collected - a.amount_collected)],
            currentPage: 0

        }
case
    FILTER_CATEGORY:
        state.allProjects = state.allProjectsCopy
    return {
        ...state,
        allProjects: state.allProjects.filter(project => project.category.some(c => c === action.payload)),
        currentPage: 0
    }

case
    FILTER_COUNTRY:
        state.allProjects = state.allProjectsCopy
    return {
        ...state,
        allProjects: state.allProjects.filter(project => project.country.some(c => c === action.payload)),
        currentPage: 0
    }


default:
    return {...state}
}
}
export default rootReducer;
