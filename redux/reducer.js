// import {} from './actions'


const initialState = {

    allProjects: [],
    allProjectsCopia: [],
    detailUsuario: {},
    userProjects: [],
    dashAdmin: { projects: [], users : []},
    pruebaConexion: "Prueba"


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        /*case GET_HOME_CARDS:
            const {home, auxDiets} = action.payload
            return {...state, foods: home, diet: auxDiets, foodsCopy: home, currentPage: 0}*/

        default:
            return {...state}
    }
}
export default rootReducer;
