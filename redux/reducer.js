import {CURRENT_PAGE, GET_HOME_PROJECTS} from './actions'


const initialState = {

    allProjects: [],
    allProjectsCopia: [],
    detailUsuario: {},
    userProjects: [],
    dashAdmin: { projects: [], users : []},
    pruebaConexion: "Prueba",
    currentPage: 0


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_HOME_PROJECTS:
            return {...state, allProjects: action.payload, currentPage: 0 }

        case CURRENT_PAGE:
            return {...state, currentPage: action.payload}

        default:
            return {...state}
    }
}
export default rootReducer;
