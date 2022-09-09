import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">

        {/* GTM Web Container (must appear in body, not head) */}
        <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKF7ZXT"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        <Head>

          {/* Security */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="img-src 'self' 'unsafe-inline' 'unsafe-eval' connect.facebook.net www.gstatic.com www.google.com www.google.ca www.google-analytics.com www.google.com stats.g.doubleclick.net 10621320.fls.doubleclick.net www.googletagmanager.com www.facebook.com ajax.googleapis.com 587433441.privacysandbox.googleadservices.com googleads.g.doubleclick.net sp.analytics.yahoo.com blob: data:;"
          />

          {/* GTM Web Container */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KKF7ZXT')
                `,
            }}
          />

          {/* Google Analytics
           *
           * G-DN364JHX07 = Google Analytics 4 (it's new)
           * UA-149140890-37 = Universal Analytics (almost depricated)
           */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-DN364JHX07`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-DN364JHX07');
              gtag('config', 'UA-37553624-1');
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}