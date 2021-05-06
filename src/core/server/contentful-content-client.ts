import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import 'cross-fetch/polyfill'
import {GraphQLClient} from 'graphql-request'
import {getSdk, Sdk} from '../../graphql/__generated__/graphql'

const uri = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`
export function createApolloClient(): ApolloClient<unknown> {
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

export function createGraphqlClient(): Sdk {
  return getSdk(
    new GraphQLClient(uri, {
      headers: {
        authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        'Content-Language': 'en-us',
      },
    }),
  )
}
