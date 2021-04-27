import {ApolloClient, InMemoryCache} from '@apollo/client'

const contentfulGraphqlClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    'Content-Language': 'en-us',
  },
  cache: new InMemoryCache(),
})

export default contentfulGraphqlClient
