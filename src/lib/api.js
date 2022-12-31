const FIREBASE_DOMAIN = 'https://quotes-a-30698-default-rtdb.firebaseio.com'

export const getAllQuotesApi = `${FIREBASE_DOMAIN}/quotes.json`;
export const addQuoteApi = `${FIREBASE_DOMAIN}/quotes.json`
export const getSingleQuoteApi = (quoteId) => `${FIREBASE_DOMAIN}/quotes/${quoteId}.json`
export const commentsApi = (quoteId) => `${FIREBASE_DOMAIN}/comments/${quoteId}.json`