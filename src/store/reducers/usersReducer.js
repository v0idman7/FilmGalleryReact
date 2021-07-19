import { LOGIN_USER, LOGOUT_USER, REG_USER, SET_FILE_USERS } from "../constants";

const initialState = {
  username: '',
  isAdmin: false,
  admin: {},
  users: [],
};

const  usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAdmin: action.payload.admin,
        username: action.payload.username,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAdmin: false,
        username: '',
      }
    case REG_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        username: action.payload.name,
      }
    case SET_FILE_USERS:
      return {
        ...state,
        admin: action.payload.admin,
        users: action.payload.users,
      }
    default:
      return state;
  } 
};

export default usersReducer;