import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import 'cross-fetch/polyfill'

export function createApolloClient(): ApolloClient<unknown> {
  const uri = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`
  const httpLink = createHttpLink({
    uri,
  })

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  })
  return new ApolloClient({
    uri,
    headers: {
      authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Language': 'en-us',
    },
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
