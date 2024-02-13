import api from './api'

export const fetchTopQuotes = async () => {
  const response = await api.get('quotes/top_quotes')
  console.log('***Received Response:')
  console.log(response)
  return response.data.quotes
}

export const fetchQuotesByPage = async (page) => {
  const response = await api.get('quotes', { params: { page } })
  console.log('***Received Response:')
  console.log(response)
  return response.data
}

export const fetchQuotesByCursor = async (cursor) => {
  const response = await api.get('quotes', { params: { cursor } })
  console.log('***Received Response:')
  console.log(response)
  return response.data
}

export const postQuote = (quote) => api.post('quotes', quote)

export const resetQuotes = () => api.post('quotes/reset', {})
