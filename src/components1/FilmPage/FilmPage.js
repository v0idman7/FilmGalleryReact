import './FilmPage.scss';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFilmPage } from '../../services';
import defaultPoster from '../../asset/images/content/Poster.png';
import SvgLink from '../SvgLink/SvgLink';
import Loader from '../Loader/Loader';

function FilmPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const addFilms = useSelector((state) => state.films.add);
  const editFilms = useSelector((state) => state.films.edit);

  const checkID = (id, type) => {
    if (type === 'Add') {
      for(let i = 0; i < addFilms.length; i++){
        if (addFilms[i].id === id) {
          return i
        };
      }
      return false;
    } else if (type === 'Edit') {
      for(let j = 0; j < editFilms.length; j++){
        if (String(editFilms[j].id) === id) {
          return j
        };
      }
      return false;
    }
  }

  const idFilmAdd = checkID(id, 'Add');
  const idFilmEdit = checkID(id, 'Edit');

  useEffect(() => {
    if (editFilms.length !== 0 && idFilmEdit !== false) {
      setFilm(editFilms[idFilmEdit]);
    }else if (addFilms.length !== 0 && idFilmAdd !== false) {
      setFilm(addFilms[idFilmAdd]);
    }else getFilmPage(id).then((result) => setFilm(result));
  },[id, addFilms, idFilmEdit, idFilmAdd, editFilms]);

  return (
    film !== null ? ( <section className="film">
      <img className="film__poster" src={film.poster_path !== null ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : defaultPoster} alt="Film poster"/>
      {isAdmin ? <SvgLink svg="Delete1" size={40} id={film.id} /> : null}
      {isAdmin ? <SvgLink svg="Edit" size={40} id={film.id} /> : null}
      <div className="film__info">
        <span className="film__name">{film.title}</span>
        <span className="film__rating">{film.vote_average}</span>
        <span className="film__release">{film.release_date}</span>
        {film.production_countries ? <span className="film__countries">{film.production_countries.map((item) => item.name).join(', ')}</span> : null}
        <span className="film__genres">{film.genres.map((item) => item.name).join(', ')}</span>
        {film.tagline ? <span className="film__slogan">{film.tagline}</span> : null}
        <p className="film__about">{film.overview}</p>
      </div>
    </section>) : <Loader />
  );
}

export default FilmPage;