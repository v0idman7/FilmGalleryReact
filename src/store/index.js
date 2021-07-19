import { createStore, combineReducers, compose } from "redux";
import pageReducer from "./reducers/pageReducer";
import usersReducer from "./reducers/usersReducer";
import filmsReducer from "./reducers/filmsReducer";

const rootReducer = combineReducers({
  page: pageReducer,
  users: usersReducer,
  films: filmsReducer,
});

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;