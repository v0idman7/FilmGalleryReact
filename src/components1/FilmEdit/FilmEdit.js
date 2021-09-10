import { useState, useEffect } from 'react';
import { Field, Formik } from 'formik';
import { Redirect, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, getFilmPage } from '../../services';
import { editFilm } from '../../store/actions';

function FilmEdit() {
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const addFilms = useSelector((state) => state.films.add);
  const [genres, setGenres] = useState(null)
  const [film, setFilm] = useState(null);

  const checkID = (id) => {
    for(let i = 0; i < addFilms.length; i++){
      if (addFilms[i].id === id) {
        return i
      };
    }
    return false;
  }

  const idFilm = checkID(id);

  useEffect(() => {
    if (addFilms.length !== 0 && idFilm !== false) {
      setFilm(addFilms[idFilm]);
    }
    else getFilmPage(id).then((result) => setFilm(result));
  },[id, addFilms, idFilm]);

  useEffect(() => {
    getGenres().then((result) => setGenres(result.genres));
  },([]));

  const getID = (name) => {
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].name === name) return genres[i].id;
    }
  }

  const updateGenres = (valGenres) => {
    for (let i = 0; i < valGenres.length; i++) {
      valGenres[i] = {id: getID(valGenres[i]), name: valGenres[i]}
    }
    return valGenres;
  }

  return ( 
    isAdmin ? (
    film !== null && genres !== null ?
    <Formik 
      initialValues={{
        title: film.title,
        overview: film.overview,
        poster_path: film.poster_path,
        popularity: film.popularity,
        release_date: film.release_date,
        genres: film.genres.map((item) => item.name),
        vote_average: film.vote_average,
        vote_count: film.vote_count,
        adult: film.adult,
      }}
      validationSchema={
        Yup.object({
          title: Yup.string().min(3, 'Must be 3 characters or more').required('Required'),
          overview: Yup.string().required('Required'),
          poster_path: Yup.string().required('Required'),
          popularity: Yup.number().required('Required'),
          release_date: Yup.date().required('Required'),
          vote_average: Yup.number().required('Required'),
          vote_count: Yup.number().required('Required'),
          adult: Yup.boolean().required('Required'),
        })
      }
      validateOnBlur
      onSubmit = { (values) => {
        const newFilm = {
          id: film.id,
          title: values.title,
          overview: values.overview,
          poster_path: values.poster_path,
          popularity: values.popularity,
          release_date: values.release_date,
          genres: updateGenres(values.genres),
          vote_average: values.vote_average,
          vote_count: values.vote_count,
          adult: values.adult,
        }
        dispatch(editFilm(newFilm));
      }}
    >
      {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, resetForm}) => (
      <fieldset  className="form form-signUp">
        <legend className="form__title">Edit Film</legend>
        <input 
          className="form__input title" 
          name="title" 
          type="text" 
          placeholder="Film Title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title} 
        />
        {touched.title && errors.title ? (
          <div className="form__alert">{errors.title}</div>
        ) : null}
        <textarea 
          className="form__input overview" 
          name="overview" 
          placeholder="Film Overview"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.overview} 
        ></textarea>
        {touched.overview && errors.overview ? (
          <div className="form__alert">{errors.overview}</div>
        ) : null}
        <input 
          className="form__input poster_path" 
          name="poster_path" 
          type="text" 
          placeholder="Poster Path" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.poster_path}
        />
        {touched.poster_path && errors.poster_path ? (
          <div className="form__alert">{errors.poster_path}</div>
        ) : null}
        <input 
          className="form__input popularity" 
          name="popularity" 
          type="number" 
          placeholder="Film Popularity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.popularity} 
        />
        {touched.popularity && errors.popularity ? (
          <div className="form__alert">{errors.popularity}</div>
        ) : null}
        <input 
          className="form__input release_date" 
          name="release_date" 
          type="date" 
          placeholder="Film Release" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.release_date}
        />
        {touched.release_date && errors.release_date ? (
          <div className="form__alert">{errors.release_date}</div>
        ) : null}
        <Field
          className="form__input genres" 
          aria-placeholder="Film Genres" 
          component="select"
          name="genres"
          multiple={true}
        >
          {genres.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </Field>
        {touched.genres && errors.genres ? (
          <div className="form__alert">{errors.genres}</div>
        ) : null}
        <input 
          className="form__input vote_average" 
          name="vote_average" 
          type="number" 
          placeholder="Film Vote-average" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.vote_average}
        />
        {touched.vote_average && errors.vote_average ? (
          <div className="form__alert">{errors.vote_average}</div>
        ) : null}
        <input 
          className="form__input vote_count" 
          name="vote_count" 
          type="number" 
          placeholder="Film Vote-count"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.vote_count}
        />
        {touched.vote_count && errors.vote_count ? (
          <div className="form__alert">{errors.vote_count}</div>
        ) : null}
        <label className="form__label adult__label">
          <input 
            className="form__input adult" 
            name="adult" 
            value={true}
            type="checkbox"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.adult && errors.adult ? (
            <div className="form__alert">{errors.adult}</div>
          ) : null}
        Adult</label>
        <div className="form__alert"></div>
        <div className="form__buttons">
          <button className="form__add" type="submit" onClick={handleSubmit}>Edit</button>
          <button className="form__clear" type="reset" onClick={resetForm}>Clear</button>
        </div>
      </fieldset>
      )}
    </Formik>
    : null)
    : <Redirect to="/NotFound" />
  );
}

export default FilmEdit;