import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="description" content="Crimson Paints" />
          <meta name="author" content="Crimson Paints" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link href={`${process.env.NEXT_PUBLIC_BASE_URL}/css/custom.css`} rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument