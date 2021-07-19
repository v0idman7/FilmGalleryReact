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

const getIsAdmin = (state) => state.users.isAdmin;

function App() {
  const isAdmin = useSelector(getIsAdmin);
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <section className="filmSection">
            <FilmSort></FilmSort>
            {isAdmin ? <SvgLink svg="Plus" size="30"></SvgLink> : null}
            <FilmList></FilmList>
            <Pagination></Pagination>
          </section>
        </Route>
        <Route path="/Add">
          <FilmAdd></FilmAdd>
        </Route>
        <Route path="/Edit:id">
          <FilmEdit></FilmEdit>
        </Route>
        <Route path="/SignIn">
          <SignIn></SignIn>
        </Route>
        <Route path="/SignUp">
          <SignUp></SignUp>
        </Route>
        <Route path="/Film:id">
          <FilmPage></FilmPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
