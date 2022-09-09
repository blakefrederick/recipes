import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

export default function Home() {
  const [keyword, setKeyword] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const { basePath } = useRouter()

  const getBooks = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${basePath}/api/books/search/`, {
        params: { keyword },
      })
      const { data } = res
      setLoading(false)
      console.log(data)
      setResponse(data)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-raleway items-center min-h-screen">
      <h1 className="text-6xl font-bold text-active mt-20 text-[#602F6B]">Books</h1>
      <h2 className="text-primary text-2xl font-light mt-5">Search books.</h2>
      <p>
        <Link href="/">
          <a className="underline small">(or recipes)</a>
        </Link>
      </p>
      <p className="block text-primary text-sm text-[#602F6B]">Max 100 searches per month, unfortunately.</p>
      <p className="md:px-12"></p>
      <form
        className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
        onSubmit={(e) => {
          getBooks()
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <input
          type="text"
          className="border-[#333333] flex w-full rounded-lg px-5 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a book title, author"
          onChange={(e) => {
            setKeyword(e.target.value)
            setResponse(null)
          }}
        />
        <div className="mt-5 flex sm:flex-row flex-col justify-start"></div>

        <button
          className="bg-[#602F6B] text-[#FFFFFF] mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
          type="submit"
        >
          {loading ? <>Loading..</> : <>Search</>}
        </button>
      </form>
      {response && (
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {response.map((book) => (
              <div key={book.id} className="pt-6">
                <div className="flow-root bg-light rounded-lg px-4 pb-8">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="p-2">
                        <img src={book.cover} className="w-full h-full rounded-lg" alt={`Book cover of ` + book.name} />
                      </span>
                    </div>
                    <div className="text-center justify-center items-center">
                      <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                        {book.name}
                      </h3>
                      {book.rating && book.year && (
                        <span className="mt-2 text-sm text-secondary block">
                          Rating {book.rating} Year {book.year}
                        </span>
                      )}
                      <a className="mt-4 text-sm text-active block" href={book.url} target="_blank" rel="noreferrer">
                        Goodreads
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
