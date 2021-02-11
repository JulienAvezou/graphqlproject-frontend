import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Provider, createClient, fetchExchange, dedupExchange } from 'urql';
import { cacheExchange } from "@urql/exchange-graphcache";
import theme from '../theme';
import { LoginMutation, MeDocument } from '../generated/graphql';

const client = createClient({ 
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result: LoginMutation, args, cache, info) => {
          cache.updateQuery({query: MeDocument }, (data: MeQuery) => {

          });
        },
      },
    },
  }), fetchExchange]
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
