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
  RESET_SCROLL

} from "./actions";

const initialState = {
  allProjects: [],
  numPages: '',
  allProjectsCopy: [],
  filterProjects: [],
  searchProjects: [],
  /*  */
  detailUsuario: {},
  detailProject: {},
  comments: [],
  userProjects: [],
  category: [],
  country: [],
  dashAdmin: { projects: [], users: [] },
  currentPage: 0,

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
      // console.log("action dentro de get home " + JSON.stringify(action.payload.category))
      return {
        ...state,
        /* allProjects: action.payload.data, */
        allProjectsCopy: action.payload.data,
        currentPage: 0,
        category: action.payload.category,
        country: action.payload.country,
      };
    case GET_PROJECT_INFITITY_SCROLL:
      return {
        ...state, 
        allProjects: state.allProjects.concat(action.payload.data),
        numPages: action.payload.pages
      }
    case DELETE_SEARCH_AND_FILTER:
      return {
        ...state,
        filterProjects: action.payload,
        searchProjects: action.payload,
      }
    case FILTER_OF_ALL_PROJECTS_OR_SEARCH_PROJECTS:
      return {
        ...state,
        filterProjects: action.payload
      }
      case RESET_SCROLL:
        return {
          ...state,
          allProjects: action.payload
        }

    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

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
    case ORDER_TOP:
      return {
        ...state,
        allProjects:
          action.payload === "Ascendente"
            ? [
              ...state.allProjects.sort(
                (a, b) => a.amount_collected - b.amount_collected
              ),
            ]
            : [
              ...state.allProjects.sort(
                (a, b) => b.amount_collected - a.amount_collected
              ),
            ],
        allProjectsCopy:
          action.payload === "Ascendente"
            ? [
              ...state.allProjects.sort(
                (a, b) => a.amount_collected - b.amount_collected
              ),
            ]
            : [
              ...state.allProjects.sort(
                (a, b) => b.amount_collected - a.amount_collected
              ),
            ],
        currentPage: 0,
      };
    case FILTER_CATEGORY:
      return {
        ...state,
        allProjects: state.allProjects.filter((project) =>
          project.categories.find((c) => c.name === action.payload)
        ),
        currentPage: 0,
      };

    case FILTER_COUNTRY:
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (project) => project.country.name === action.payload
        ),
        currentPage: 0,
      };

    // case CONFIRM_EMAIL:
    // case CONFIRM_EMAIL_ERROR:
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
        ...state,

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
