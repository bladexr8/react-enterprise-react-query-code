import { postQuote, resetQuotes } from '@/api/quoteApi'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

type UpdateQuotesProps = {}

const UpdateQuotes = (props: UpdateQuotesProps) => {
  const queryClient = useQueryClient()
  const createQuoteMutation = useMutation(postQuote)
  const resetQuotesMutation = useMutation(
    (e: React.MouseEvent<HTMLButtonElement>) => resetQuotes()
  )
  const [form, setForm] = useState({
    author: '',
    quote: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((_form) => ({
      ..._form,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { author, quote } = form
    if (!author || !quote) {
      alert('Please provide quote and author text.')
      return
    }
    await createQuoteMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          quote: '',
          author: '',
        })
        queryClient.invalidateQueries('top-quotes')
        alert('Quote created')
      },
    })
  }

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    resetQuotesMutation.mutate(e, {
      onSuccess: () => {
        queryClient.invalidateQueries('top-quotes')
      },
    })
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Create quote</h2>
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
              ? 'Creating quote...'
              : 'Create quote'}
          </button>
          <button
            onClick={onReset}
            disabled={resetQuotesMutation.isLoading}
            className="border-blue-600 text-blue-600 px-4 py-3"
          >
            {resetQuotesMutation.isLoading ? 'Resetting...' : 'Reset quotes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateQuotes