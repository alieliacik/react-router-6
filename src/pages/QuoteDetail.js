import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuoteApi } from "../lib/api";


const QuoteDetail = () => {
  const { sendRequest, data, status, error } = useHttp()
  const { quoteId } = useParams();

  useEffect(() => {
    sendRequest(getSingleQuoteApi(quoteId))
  }, [sendRequest, quoteId])

  if (status === 'pending' || !data) {
    return (<div className='centered'> <LoadingSpinner /></div>)
  }
  if (error) {
    return <p className='centered focused'>{error}</p>
  }

  return (
    <>
      <HighlightedQuote text={data.text} author={data.author} />
      <Outlet />
    </>
  );
}

export default QuoteDetail;