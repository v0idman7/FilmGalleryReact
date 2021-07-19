import { 
  TO_PAGE, 
  INCREMENT, 
  DECREMENT, 
  FILM_SORT, 
  LOGIN_USER, 
  LOGOUT_USER, 
  REG_USER,
  SET_FILE_USERS, 
  ADD_FILM, 
  EDIT_FILM, 
  DELETE_FILM 
} from "../constants";

export const toPage = (number) => ({
  type: TO_PAGE,
  payload: number,
});

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const filmSort = (value) => ({
  type: FILM_SORT,
  payload: value,
});


export const loginUser = (username, isAdmin) => ({
  type: LOGIN_USER,
  payload: {
    username: username,
    admin: isAdmin,
  }
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const regUser = (user) => ({
  type: REG_USER,
  payload: user,
});

export const setFileUsers = (users) => ({
  type: SET_FILE_USERS,
  payload: users,
});


export const addFilm = (film) => ({
  type: ADD_FILM,
  payload: film,
});

export const editFilm = (film) => ({
  type: EDIT_FILM,
  payload: film,
});

export const deleteFilm = (id) => ({
  type: DELETE_FILM,
  payload: id,
})