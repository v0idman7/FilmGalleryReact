import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFilms } from '../../services';
import Film from '../Film/Film';
import Loader from '../Loader/Loader';
import './FilmList.scss';

function FilmList() {
  const [films, setFilms] = useState(null)
  const page = useSelector((state) => state.page.page);
  const sort = useSelector((state) => state.page.sort);
  const addFilms = useSelector((state) => state.films.add);
  const editFilms = useSelector((state) => state.films.edit);
  const deleteFilms = useSelector((state) => state.films.delete);

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
      if (deleteFilms.length !== 0) {
        for (let i = 0; i < deleteFilms.length; i++) {
          display = display.filter(item => String(item.id) !== String(deleteFilms[i]))
        }
      }
      setFilms(display)
    })
  },[page, sort, addFilms, editFilms, deleteFilms]);
 
  return ( 
    <ul className="filmList">
        {films !== null ? films.map((film) => (
          <li key={film.id} className="listItem">
            <Film 
              id={film.id} 
              poster={film.poster_path} 
              title={film.title} 
              rating={film.vote_average} 
              release={film.release_date} 
            />
          </li>
        )): <Loader />}
    </ul>
  );
}

export default FilmList;