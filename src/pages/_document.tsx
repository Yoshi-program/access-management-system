import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets as MaterialUIStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet as StyledComponentsStyleSheets } from 'styled-components'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#9f9f9f" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const materialUISheets = new MaterialUIStyleSheets()
  const styledComponentsSheets = new StyledComponentsStyleSheets()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentsSheets.collectStyles(materialUISheets.collect(<App {...props} />)),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentsSheets.getStyleElement()}
        </>
      ),
    }
  } finally {
    styledComponentsSheets.seal()
  }
}

export default MyDocument
