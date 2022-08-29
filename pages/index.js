import { useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from "axios"

import styled from 'styled-components'
const Button = styled.button`
  margin: 40px auto;
  padding: 5px;
  border-radius: 3px;
  width: 175px;
  font-size: 16px;
  text-align: center;
  color: #222222;
  background-color: ${props => props.backgroundColor};

  &:hover {
    color: ${props => props.hoverColor};
    filter: brightness(1.15);
  }
`

export default function Home() {
  const [keyword, setKeyword] = useState(null)
  const [fat, setFat] = useState(null)
  const [protein, setProtein] = useState(null)
  const [sugar, setSugar] = useState(null)
  const [exclude, setExclude] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { basePath } = useRouter()
  

  const getRecipes = async () => {
    try {
      setLoading(true)
      // First see if we have enough API credits to conduct the query
      const numCreditsRemaining = await getCreditsRemaining()
      
      if (numCreditsRemaining > 5) {
        console.log("Conducting recipe search")
        searchRecipes()
        setError(`Credits remaining today: ` + numCreditsRemaining)
      }
      else {
        outOfCredits()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getCreditsRemaining = async () => {
    const credits = await axios.get(`${basePath}//api/credits/`, {
      params: { },
    })
    console.log('credits', credits.data.creditsRemaining)
    return credits.data.creditsRemaining 
  }
  
  const recordSearch = async () => {
    const searchRecorded = await axios.get(`${basePath}/api/recordSearch/`, {
      params: { },
    })
    console.log('searchRecorded', searchRecorded.data.success)
    return searchRecorded.data.success
  }

  const searchRecipes = async () => {
    recordSearch()
    const res = await axios.get(`${basePath}/api/search/`, {
      params: { keyword, exclude, fat, protein, sugar },
    })
    const { data } = res;
    setResponse(data.results.length > 0 ? data.results : "Sorry, no results for that search term!")
    return data.results
  }

  const outOfCredits = async () => {
    setError('Out of credits!')
  }

  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-raleway items-center min-h-screen">
      <h1 className="text-6xl font-bold text-active mt-20">Typical Recipe Search</h1>
      <h2 className="text-primary text-2xl font-light mt-5">
        Just a typical recipe search. That's it. {/* <Link href="/books"><a className="underline">(and books)</a></Link> */}
      </h2>
        <p className="block text-primary text-sm">{error}</p>
      <form
        className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
        onSubmit={(e) => {
          getRecipes();
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <input
          type="text"
          className="border-2 border-gray-800 flex w-full rounded-lg px-5 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Describe what you want"
          onChange={(e) => {
            setKeyword(e.target.value)
            setResponse(null)
          }}
        />
        <div className="mt-5 flex sm:flex-row flex-col justify-start">
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Don't want
            </label>
            <input
              type="text"
              className="border-2 border-gray-800 mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setExclude(e.target.value)}
              placeholder="flour"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Protein min g
            </label>
            <input
              type="number"
              className="border-2 border-gray-800 mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setProtein(e.target.value)}
              placeholder="10"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Fat min g
            </label>
            <input
              type="number"
              className="border-2 border-gray-800 mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setFat(e.target.value)}
              placeholder="10"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Sugar max g
            </label>
            <input
              type="number"
              className="border-2 border-gray-800 mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setSugar(e.target.value)}
              placeholder="10"
            ></input>
          </div>
        </div>

        <Button
          className=""
          type="submit"
          hoverColor="black"
          backgroundColor="rgba(142, 194, 152, 0.6)"
        >
          {loading ? <>Loading..</> : <>Search</>}
        </Button>
      </form>
      {response && (
        <div className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {response.map((recipe) => (
              <div key={recipe.id} className="pt-6">
                <div className="flow-root bg-light rounded-lg px-4 pb-8">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="p-2">
                        <img
                          src={
                            `https://spoonacular.com/recipeImages/` +
                            recipe.image
                          }
                          className="w-full h-full rounded-lg"
                          alt={recipe.id}
                        />
                      </span>
                    </div>
                    <div className="text-center justify-center items-center">
                      <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                        {recipe.title}
                      </h3>
                      <span className="mt-2 text-sm text-secondary block">
                        Ready in {recipe.readyInMinutes} minutes -{" "}
                        {recipe.servings} Servings
                      </span>
                      <a
                        className="mt-4 text-sm text-active block"
                        href={recipe.sourceUrl}
                        target="_blank"
                      >
                        Go to Recipe
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
  );
}
