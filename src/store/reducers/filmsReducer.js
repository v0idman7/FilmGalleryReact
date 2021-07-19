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
      const add = state.add.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        add: add,
        edit: [...state.edit, action.payload],
      }
    case DELETE_FILM:
      const add1 = state.add.filter(item => item.id !== action.payload);
      const edit = state.edit.filter(item => item.id !== action.payload);
      return {
        ...state,
        add: add1,
        edit: edit,
        delete: [...state.delete, action.payload],
      }
    default:
      return state;
  } 
};

export default filmsReducer;