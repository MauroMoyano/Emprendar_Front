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

export const getHomeProjects = () => {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/project/");

    const arrayCountry = [];
    let arrayCategory = [];

    data.forEach((project) => {
      arrayCountry.push(project.country);
    });
    const country = [...new Set(arrayCountry)];

    data.forEach((project) => [
      (arrayCategory = [...arrayCategory, ...project.category]),
    ]);
    const category = [...new Set(arrayCategory)];

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

//registrar usuarios
export const signInUser = (data) => {

    return async function(dispatch) {

        try {
            const response = await clienteAxios.post('/user',data)

            dispatch({
                type: SIGNIN_SUCESS,
                payload: response.data.message
            })
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

            const router = useRouter()
            router.push('/home')            
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