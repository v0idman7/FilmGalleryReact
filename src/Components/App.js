import './App.scss';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './Header/Header'
import FilmSort from './FilmSort/FilmSort'
import SvgLink from './SvgLink/SvgLink';
import FilmList from './FilmList/FilmList';
import FilmPage from './FilmPage/FilmPage';
import FilmAdd from './FilmAdd/FilmAdd';
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Pagination from './Pagination/Pagination';
import { useSelector } from 'react-redux';
import FilmEdit from './FilmEdit/FilmEdit';
import NotFound from './NotFound/NotFound';

function App() {
  const isAdmin = useSelector((state) => state.users.isAdmin);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <section className="filmSection">
            <FilmSort />
            {isAdmin ? <SvgLink svg="Plus" size="30" /> : null}
            <FilmList />
            <Pagination />
          </section>
        </Route>
        <Route path="/Add" exact>
          <FilmAdd />
        </Route>
        <Route path="/Edit:id" exact>
          <FilmEdit />
        </Route>
        <Route path="/SignIn" exact>
          <SignIn />
        </Route>
        <Route path="/SignUp" exact>
          <SignUp />
        </Route>
        <Route path="/Film:id" exact>
          <FilmPage />
        </Route>
        <Route path="/NotFound" exact>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
