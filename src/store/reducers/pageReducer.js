import { TO_PAGE, INCREMENT, DECREMENT, FILM_SORT } from "../constants";

const initialState = {
  page: 1,
  sort: "popularity.desc",
};

const  pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TO_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case INCREMENT:
      return {
        ...state,
        page: state.page + 1,
      }
    case DECREMENT:
      return {
        ...state,
        page: state.page - 1,
      }
    case FILM_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    default:
      return state;
  } 
};

export default pageReducer;