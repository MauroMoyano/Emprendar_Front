import { Sansita } from 'next/font/google'
import {CURRENT_PAGE, GET_HOME_PROJECTS, GET_DETAIL_PROJECT,RESET_DETAIL_PROJECT, GET_USER} from './actions'


const initialState = {

    allProjects: [],
    allProjectsCopia: [],
    detailUsuario: {},
    detailProject :{
        name:"fakedata"
    },
    userProjects: [],
    dashAdmin: { projects: [], users : []},
    currentPage: 0


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_HOME_PROJECTS:
            return {...state, allProjects: action.payload, allProjectsCopia: action.payload ,currentPage: 0 }

        case CURRENT_PAGE:
            return {...state, currentPage: action.payload}
            
        case GET_DETAIL_PROJECT :
            return {
                ...state, detailProject: action.payload
            }
        case RESET_DETAIL_PROJECT :
            return {
                ...state, detailProject: {}
            }
        case GET_USER :
            return {
                ...state, detailUsuario:action.payload
            }
    
        
        default:
            return {...state}
    }
}
export default rootReducer;
