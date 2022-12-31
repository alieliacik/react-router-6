import QuoteForm from '../components/quotes/QuoteForm'
import { useNavigate } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addQuoteApi } from '../lib/api'
import { useEffect } from 'react'

const NewQuote = () => {
  const { sendRequest, status, data } = useHttp()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      navigate('/quotes')
    }
  }, [data, navigate])

  const addQuoteHandler = (quoteData) => {
    sendRequest(addQuoteApi, JSON.stringify(quoteData), 'post')
  }
  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
}

export default NewQuote;