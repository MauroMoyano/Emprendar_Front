import {
  CURRENT_PAGE,
  GET_HOME_PROJECTS,
  GET_DETAIL_PROJECT,
  RESET_DETAIL_PROJECT,
  GET_USER,
  ORDER_TOP,
  FILTER_CATEGORY,
  FILTER_COUNTRY,
  LOGIN_SUCESS,
  SIGNIN_ERROR,
  LOGIN_ERROR,
  LOGOUT,
  USER_AUTHED,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_ERROR,
  CREATE_PROJECT,
  SIGNIN_SUCESS,
  CLEAN_MESSAGE,
  SEARCH_VALUE,
  GET_COMMENTS,
  CREATE_COMMENT,
  GET_PROJECT_INFITITY_SCROLL,
  DELETE_SEARCH_AND_FILTER,
  FILTER_OF_ALL_PROJECTS_OR_SEARCH_PROJECTS,
  RESET_SCROLL,
  CHANGE_PATH_AND_PAGE,
  DELETE_COMMENT,
  GET_USERS_INFITITY_SCROLL,
  CHANGE_PATH_AND_PAGE_USERS

} from "./actions";

const initialState = {
  allProjects: [],
  numPages: '',
  pathValue: 'orden=&country=&category=&search=',
  /* solo para usuarios */
  pathUserValue: 'orden=&search=',
  allUsers: [],
  /*  */
  detailUsuario: {},
  detailProject: {},
  comments: [],
  userProjects: [],
  category: [],
  country: [],
  dashAdmin: { projects: [], users: [] },

  //estados para el autenticado
  token: typeof window != "undefined" ? localStorage.getItem("token") : "",
  auth: true,
  user: null,
  //estado de mensahes
  message: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_PROJECTS:
      return {
        ...state,
    
        category: action.payload.category,
        country: action.payload.country,
        detailUsuario: {}
      };
    case GET_PROJECT_INFITITY_SCROLL:
      return {
        ...state,
        allProjects: state.allProjects.concat(action.payload.data),
        numPages: action.payload.pages
      }
    case GET_USERS_INFITITY_SCROLL:
      
      return {
        ...state,
        allUsers: state.allUsers.concat(action.payload.data),
        numPages: action.payload.pages
      }
    case CHANGE_PATH_AND_PAGE_USERS:
      return {
        ...state,
        allUsers: [],
        allProjects: [],
        pathUserValue: action.payload
      }
    case RESET_SCROLL:
      return {
        ...state,
        allProjects: action.payload,
        allUsers: action.payload
      }
    case CHANGE_PATH_AND_PAGE:
      return {
        ...state,
        allProjects: [],
        allUsers : [],
        pathValue: action.payload
      }

 

    case GET_DETAIL_PROJECT:
      return {
        ...state,
        detailProject: action.payload,
      };
    case RESET_DETAIL_PROJECT:
      return {
        ...state,
        detailProject: {},
      };
    case GET_USER:
      return {
        ...state,
        detailUsuario: action.payload,
      };
   
    case SIGNIN_SUCESS:
    case LOGIN_ERROR:
    case SIGNIN_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    case LOGIN_SUCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
        auth: true,
        message: null
      };

    case USER_AUTHED:
      return {
        ...state,
        user: action.payload,
        auth: true,
      };

    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        user: null,
        token: null,
        autenticado: null,
      };

    case CONFIRM_EMAIL:
    case CONFIRM_EMAIL_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    // case CREATE_PROJECT:
    //   return {
    //       ...state,
    //       allProjects: [action.payload, ...state.allProjects]
    //     }


    case SEARCH_VALUE:
      return {
        ...state,
        searchProjects: action.payload
      }

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }

    case CREATE_COMMENT:

      return {
        ...state, comments: action.payload

      }

    case DELETE_COMMENT: {
      return {
        ...state, comments: state.comments.filter(comment => comment.id !== action.payload)
      }
    }

    case CLEAN_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }

    default:
      return { ...state };
  }
};
export default rootReducer;
