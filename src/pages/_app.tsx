import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { CssBaseline, StylesProvider } from '@material-ui/core'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StylesProvider>
  )
}
export default MyApp
