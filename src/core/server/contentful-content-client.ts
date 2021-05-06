import {ApolloClient, InMemoryCache} from '@apollo/client'

export class ContentClientFactory {
  private static instance: ApolloClient<unknown>

  public static getInstance(): ApolloClient<unknown> {
    if (!this.instance) {
      this.instance = new ApolloClient({
        uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
        headers: {
          authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
          'Content-Language': 'en-us',
        },
        cache: new InMemoryCache(),
      })
    }
    return this.instance
  }
}
