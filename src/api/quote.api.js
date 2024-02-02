import api from './api'

export const fetchTopQuotes = async () => {
  const response = await api.get('quotes/top_quotes')
  console.log('***Received Response:')
  console.log(response)
  return response.data.quotes
}
