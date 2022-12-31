import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQutes = (quotes, descending) => {
  return quotes.sort((a, b) => {
    if (descending) {
      return a.id < b.id ? 1 : -1
    } else {
      return a.id > b.id ? 1 : -1
    }
  })
}


const QuoteList = (props) => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const searchParams = new URLSearchParams(search)
  const isDescending = searchParams.get('sort') === 'desc'
  const sortedQuotes = sortQutes(props.quotes, isDescending)

  const changeSortingHandler = () => {
    navigate({
      pathname,
      search: `?sort=${isDescending ? 'asc' : 'desc'}`
    })
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isDescending ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
