import Head from 'next/head'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ProductsProvider } from '../src/Products/context'
import { SessionProvider } from '../src/Session/context'

const App = ({ Component, pageProps }: AppProps) => {

  const theme = extendTheme({
    styles: {
      global: ( props ) => ({
        '*': {
          touchAction: 'manipulation',
          fontFamily: '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;',
        },
        'body': {
          backgroundColor: '#F9F9F9',
        }
      })
    }
  })

  return (
    <>
      <Head>
        <title>Aerolab Challenge</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <ChakraProvider theme={ theme }>
        <SessionProvider>
          <ProductsProvider>
              <Component { ...pageProps } />
          </ProductsProvider>
        </SessionProvider>
      </ChakraProvider>
    </>
  )
}

export default App
