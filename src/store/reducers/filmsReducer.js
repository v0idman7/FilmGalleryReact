import { ADD_FILM, EDIT_FILM, DELETE_FILM } from "../constants";

const initialState = {
  add: [],
  edit: [],
  delete: [],
};

const  filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILM:
      return {
        ...state,
        add: [...state.add, action.payload],
      };
    case EDIT_FILM:
      return {
        ...state,
        edit: [...state.edit, action.payload],
      }
    case DELETE_FILM:
      return {
        ...state,
        add: state.add.filter(item => String(item.id) !== String(action.payload)),
        edit: state.edit.filter(item => String(item.id) !== String(action.payload)),
        delete: [...state.delete, action.payload],
      }
    default:
      return state;
  } 
};

export default filmsReducer;