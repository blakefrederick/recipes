import { useState } from "react";
import Link from 'next/link'
import axios from "axios";

export default function Home() {
  const [keyword, setKeyword] = useState(null);
  const [fat, setFat] = useState(null);
  const [protein, setProtein] = useState(null);
  const [sugar, setSugar] = useState(null);
  const [exclude, setExclude] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/search/", {
        params: { keyword, exclude, fat, protein, sugar },
      });
      const { data } = res;
      setLoading(false);
      setResponse(data.results);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:px-12 px-0 relative bg-background font-raleway items-center min-h-screen">
      <h1 className="text-6xl font-bold text-active mt-20">Plant-based Recipe Search</h1>
      <h2 className="text-primary text-2xl font-light mt-5">
        Search Plant-based recipes only. That's it. <Link href="books"><a className="underline">(and books)</a></Link>
      </h2>
      <p className="block text-primary text-sm">Remember to conduct a maximum of 50 searches per day else it costs money.</p>
      <form
        className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
        onSubmit={(e) => {
          getRecipes();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          className="flex w-full rounded-lg px-5 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter a recipe"
          onChange={(e) => {
            setKeyword(e.target.value);
            setResponse(null);
          }}
        />
        <div className="mt-5 flex sm:flex-row flex-col justify-start">
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Exclude Ingredients
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setExclude(e.target.value)}
              placeholder="flour"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Protein (minimum, grams)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setProtein(e.target.value)}
              placeholder="10"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Fat (minimum, grams)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setFat(e.target.value)}
              placeholder="10"
            ></input>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">
              Sugar (maximum, grams)
            </label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg px-5 py-3 text-base font-bold focus:outline-none"
              onChange={(e) => setSugar(e.target.value)}
              placeholder="10"
            ></input>
          </div>
        </div>

        <button
          className="mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
          type="submit"
        >
          {loading ? <>Loading..</> : <>Search</>}
        </button>
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
