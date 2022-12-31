import { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getAllQuotesApi } from '../lib/api'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const AllQuotes = () => {
  const { sendRequest, data, status, error } = useHttp()

  useEffect(() => {
    sendRequest(getAllQuotesApi)
  }, [sendRequest])

  if (status === 'pending') {
    return (<div className='centered'> <LoadingSpinner /></div>)
  }
  if (error) {
    return <p className='centered focused'>{error}</p>
  }
  if (!error && status === 'completed' && (!data || data.length === 0)) {
    return <NoQuotesFound />
  }

  const transformedQuotes = [];
  for (const key in data) {
    const quoteObj = { id: key, ...data[key] };
    transformedQuotes.push(quoteObj);
  }

  return <QuoteList quotes={transformedQuotes} />
}

export default AllQuotes;