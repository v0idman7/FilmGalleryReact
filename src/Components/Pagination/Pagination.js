import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, toPage } from '../../store/actions';
import './Pagination.scss';

const getPage = (state) => state.page.page;

function Pagination() {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const numPages = 15;

  const handleClickPrev = () => {
    dispatch(decrement());
  }

  const handleClickTo = (number) => {
    dispatch(toPage(number));
  }

  const handleClickNext = () => {
    dispatch(increment());
  }

  return ( 
    <div className="pages">
      <button 
        className="pages__link" 
        onClick={handleClickPrev} 
        disabled={page === 1}
      >&#9668;</button>
      <button 
        className={page === 1 ? "pages__link pages__link--active" : "pages__link"}
        onClick={() => handleClickTo(1)}
      >1</button>

      {page > 3 ? (
        <span className="pages__dots">&#8230;</span>
      ) : null}

      {page > numPages-1 ? (
        <button 
          className="pages__link"
          onClick={() => handleClickTo(page - 4)}
        >{page - 4}</button>
      ) : null}
      {page > numPages-2 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page - 3)}
        >{page - 3}</button>
      ) : null}
      {page > 3 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page - 2)}
        >{page - 2}</button>
      ) : null}
      {page > 2 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page - 1)}
        >{page - 1}</button>
      ) : null}
      {page > 1 && page < numPages ? (
        <button 
          className="pages__link pages__link--active" 
          onClick={() => handleClickTo(page)}
        >{page}</button>
      ) : null}
      {page < numPages-1 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page + 1)}
        >{page + 1}</button>
      ) : null}
      {page < numPages-2 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page + 2)}
        >{page + 2}</button>
      ) : null}
      {page < 3 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page + 3)}
        >{page + 3}</button>
      ) : null}
      {page < 2 ? (
        <button 
          className="pages__link" 
          onClick={() => handleClickTo(page + 4)}
        >{page + 4}</button>
      ) : null}

      {page < numPages-2 ? (
        <span className="pages__dots">&#8230;</span>
      ) : null}

      <button 
        className={page === numPages ? "pages__link pages__link--active" : "pages__link"} 
        onClick={() => handleClickTo(numPages)}
      >{numPages}</button>
      <button 
        className="pages__link" 
        onClick={handleClickNext} 
        disabled={page === numPages}
      >&#9658;</button>
    </div>
  );
}

export default Pagination;