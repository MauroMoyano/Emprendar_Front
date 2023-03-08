import axios from "axios";
import clienteAxios from "config/clienteAxios";
import tokenAuth from "config/tokenAuth";
import { useRouter } from "next/router";

export const CURRENT_PAGE = "CURRENT_PAGE";
export const GET_HOME_PROJECTS = "GET_HOME_PROJECTS";
export const GET_DETAIL_PROJECT = "GET_DETAIL_PROJECT";
export const RESET_DETAIL_PROJECT = " RESET_DETAIL_PROJECT";
export const GET_USER = " GET_USER ";
export const ORDER_TOP = "ORDER_TOP";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const FILTER_COUNTRY = "FILTER_COUNTRY";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const SEARCH_VALUE = "SEARCH_VALUE"


//types para el registro

export const SIGNIN_SUCESS = "SIGNIN_SUCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";

//Types para el login
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT"

//Types para el autenticado
export const USER_AUTHED = "USER_AUTHED"
//Types para confirmar el Email
export const CONFIRM_EMAIL = "CONFIRM_EMAIL";
export const CONFIRM_EMAIL_ERROR = "CONFIRM_EMAIL_ERROR";
// const BACK_APP_URL = process.env.BACK_APP_URL
export const CLEAN_MESSAGE = "CLEAN_MESSAGE"
export const SIMILAR_PROJECTS = "SIMILAR_PROJECTS"

//comments
export const GET_COMMENTS = "GET_COMMENTS"
export const CREATE_COMMENT = "CREATE_COMMENT"





export const getHomeProjects = () => {
  return async function (dispatch) {
    //pido todos los proyectos y me devuelve un array con ellos
    const { data } = await axios.get("http://localhost:3001/project");
  
    //pido todos las categorias al back y me devuelve un array con ellas
    const category =  (await axios.get("http://localhost:3001/category")).data;
    
    //pido todos los paises al back y me devuelve un array con ellos
    const country =  (await axios.get("http://localhost:3001/country")).data;
  
    dispatch({ type: GET_HOME_PROJECTS, payload: { data, category, country } });
  };
};




export const currentPageHandler = (value) => {
  return { type: CURRENT_PAGE, payload: value };
};

export const getDetailProject = (id) => {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/project/${id} `);
    dispatch({ type: GET_DETAIL_PROJECT, payload: data });
  };
};

export const getUser = (id) => {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/user/${id} `);
    dispatch({ type: GET_USER, payload: data });
  };
};

export const orderTop = (value) => {
  return { type: ORDER_TOP, payload: value };
};


//filtro por categoria
export const filterCategory = (value) => {
  return { type: FILTER_CATEGORY, payload: value };
};

export const filterCountry = (value) => {
  return { type: FILTER_COUNTRY, payload: value };
};

export const resetDetailProject = (id) => {
  return {
    type: RESET_DETAIL_PROJECT,
  };
};

export const searchProject = (value) => {

    return async function(dispatch){
        const {data} = await axios.get(`http://localhost:3001/project?name=${value} `)
        console.log("data ", data)
        dispatch({ type: SEARCH_VALUE, payload: data})
    }

}

//registrar usuarios
export const signInUser = (data, cb) => {

    return async function(dispatch) {

        try {
            const response = await clienteAxios.post('/user',data)

            dispatch({
                type: SIGNIN_SUCESS,
                payload: response.data.message
            })

            cb()
        } catch (error) {
            dispatch({
                type: SIGNIN_ERROR,
                payload: error.response.data.message
            })
        }

    }

    
};

//autenticar usuarios
export const loginUser =  (data,cb) => {
    return async function (dispatch) {
      try {
        const response = await clienteAxios.post("/user/login", data);
  
        dispatch({
          type: LOGIN_SUCESS,
          payload: response.data,
        });

        cb()
      } catch (error) {
          console.log(error.response.data)
        dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.message,
        });
      }
    };
  };


//usuario autenticado segun el token

export const authedUser = (redirect) => {
    return async function (dispatch) {
      redirect = redirect ?? null
      const token = localStorage.getItem("token");
        
      if(token) {
        tokenAuth(token)
      }

      try {
        const response = await clienteAxios.get('/user/login/me')
        console.log(response)
        if(response.data.user) {
        
            dispatch({
                type: USER_AUTHED,
                payload: response.data.user
            })

          if(redirect) {
            redirect()
          }
        }
      } catch (error) {
        console.log('error', error)
      }
      
    };
  };
  
  

export const logOut =  () => {
    return async function(dispatch) {
        dispatch({
            type:LOGOUT
        })
    }
  };

export const confirmEmail = (token) =>{
  return async function(dispatch){
    try {
      const response = await clienteAxios.get(`user/confirmar/${token}`);

      dispatch({
        type: CONFIRM_EMAIL,
        payload: response.data.message
      })
      
    } catch (error) {
        dispatch({
          type: CONFIRM_EMAIL_ERROR,
          payload: error.response.data.message
        })
        console.log('error', error);
    }
  }
}
 

export const createProject= (obj) => {
  return {type: CREATE_PROJECT, payload: obj}
}


export const cleanMessage = () => { 
  return async function(dispatch) {
    dispatch({
      type: CLEAN_MESSAGE
    })
  } 
}


//actions for comments 

//get all comments
export const getComments = (idProject) => {
  
  return async function(dispatch) {
    const {data} = await axios.get(`http://localhost:3001/comment/${idProject} `)
    dispatch({
      type: GET_COMMENTS,
      payload : data
    })
  } 
}

// createComment
export const createComments = (data) => {
  return async function(dispatch) {
    const response = await clienteAxios.post("http://localhost:3001/comment", data);
    console.log(response);
    dispatch({
      type : CREATE_COMMENT,
      
    })
  } 
}





