import Head from 'next/head'
import 'tailwindcss/tailwind.css'

function Recipes({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Component {...pageProps} />
    </>
  )
}

export default Recipes
