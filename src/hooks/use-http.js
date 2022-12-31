import { useCallback, useReducer } from 'react';
import axios from 'axios'

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...state, status: 'pending' };
    case "SUCCESS":
      return { ...state, status: 'completed', data: action.data };
    case "ERROR":
      return { ...state, status: 'completed', error: action.error }
    default:
      return
  }
}

const initialHttpState = {
  status: '',
  data: null,
  error: null
}

function useHttp() {
  const [httpState, dispatch] = useReducer(httpReducer, initialHttpState)

  const sendRequest = useCallback(async (url, requestData = null, method = 'get') => {
    dispatch({ type: 'SEND' })
    try {
      const response = await axios({ url, data: requestData, method })
      dispatch({ type: 'SUCCESS', data: response.data })
    } catch (error) {
      dispatch({ type: "ERROR", error: error.message || `Error! Endpoint: ${url}.` })
    }
  }, [])

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
