import Head from "next/head";
import "tailwindcss/tailwind.css";

function Recipes({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager Container */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=GTM-KKF7ZXT`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GTM-KKF7ZXT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DN364JHX07"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-DN364JHX07');
            `,
          }}
        />
        <title>Recipes</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'unsafe-inline' https://blakefrederick.com https://www.googletagmanager.com; img-src www.googletagmanager.com"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default Recipes;
