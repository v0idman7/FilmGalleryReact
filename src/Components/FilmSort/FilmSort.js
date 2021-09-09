import './FilmSort.scss';

import { useDispatch } from 'react-redux';
import { filmSort } from '../../store/actions';

function FilmSort() {
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    dispatch(filmSort(target.value));
  }

  return ( 
    <select className="films-sort" name="sort" id="sort" onChange={handleChange} defaultValue="popularity.desc">
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <option value="vote_average.desc">Rating Descending</option>
      <option value="vote_average.asc">Rating Ascending</option>
      <option value="release_date.desc">Release Date Descending</option>
      <option value="release_date.asc">Release Date Ascending</option>
    </select>
  );
}

export default FilmSort;