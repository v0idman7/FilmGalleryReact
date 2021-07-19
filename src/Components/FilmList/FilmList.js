import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilms } from '../../Services';
import Film from '../Film/Film';
import Loader from '../Loader/Loader';
import './FilmList.scss';

const getPage = (state) => state.page.page;
const getSort = (state) => state.page.sort;
const getAdd = (state) => state.films.add;
const getEdit = (state) => state.films.edit;

function FilmList() {
  const [films, setFilms] = useState(null)
  const page = useSelector(getPage);
  const sort = useSelector(getSort);
  const addFilms = useSelector(getAdd);
  const editFilms = useSelector(getEdit);

  useEffect(() => {
    getFilms(page, sort).then((result) => {
      let display = [];
      if (addFilms.length !== 0 && page===1) {
        display = [...addFilms, ...result.results.slice(addFilms.length)]
      } else display = result.results
      if (editFilms.length !== 0) {
        for (let i = 0; i < editFilms.length; i++) {
          for (let j = 0; j < display.length; j++) {
            if (editFilms[i].id === display[j].id)
              display[j] = editFilms[i]
          }
        }
      }
      setFilms(display)
    })
  },[page, sort, addFilms, editFilms]);
 
  return ( 
    <ul className="filmList">
        {films !== null ? films.map((film) => (
          <li key={film.id} className="listItem">
            <Film id={film.id} poster={film.poster_path} title={film.title} rating={film.vote_average} release={film.release_date}></Film>
          </li>
        )): <Loader></Loader>}
    </ul>
  );
}

export default FilmList;