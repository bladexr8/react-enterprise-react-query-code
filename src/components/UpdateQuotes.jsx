import { postQuote, resetQuotes } from '@/api/quote.api'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const UpdateQuotes = () => {
  // get access to the QueryCLient instance
  const queryClient = useQueryClient()

  // Quotes mutations
  const createQuoteMutation = useMutation(postQuote)
  const resetQuoteMutation = useMutation(resetQuotes)

  // Form state
  const [form, setForm] = useState({
    author: '',
    quote: '',
  })

  // Update the form state on change
  const onChange = (e) => {
    setForm((_form) => ({
      ..._form,
      [e.target.name]: e.target.value,
    }))
  }

  // Validate the form and start create quote mutation
  const onSubmit = async (e) => {
    e.preventDefault()
    const { author, quote } = form
    if (!author || !quote) {
      alert('Please provide quote and author text')
      return
    }

    await createQuoteMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          quote: '',
          author: '',
        })
        queryClient.invalidateQueries(['top-quotes'])
        toast.auccess('Quote created')
      },
    })
  }

  // Reset the quotes to their original state on the server
  const onReset = (e) => {
    e.preventDefault()
    resetQuoteMutation.mutate(e, {
      onSuccess: () => {
        queryClient.invalidateQueries(['top-quotes'])
        toast.success('Quotes Reset!')
      },
    })
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Create Quote</h2>
      <form
        onSubmit={onSubmit}
        className="space-y-6 max-w-lg mx-auto text-left"
      >
        <div className="flex flex-col space-y-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label>Quote</label>
          <input
            type="text"
            name="quote"
            value={form.quote}
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-blue-100 px-4 py-3"
            disabled={createQuoteMutation.isLoading}
          >
            {createQuoteMutation.isLoading
              ? 'Creating Quote...'
              : 'Create Quote'}
          </button>
          <button
            onClick={onReset}
            className="border-blue-600 text-blue-600 px-4 py-3"
            disabled={resetQuoteMutation.isLoading}
          >
            {resetQuoteMutation.isLoading ? 'Resetting...' : 'Reset Quotes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateQuotes
