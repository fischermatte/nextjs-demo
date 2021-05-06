import {createApolloClient, createGraphqlClient} from './contentful-content-client'
import {GetAllCommentsDocument} from '../../graphql/__generated__/graphql'

test('ApolloClient', async () => {
  const client = createApolloClient()
  expect(client).toBeDefined()
  const {data} = await client.query({
    query: GetAllCommentsDocument,
  })
  expect(data).toBeDefined()
})

test('GraphqlClient', async () => {
  const client = createGraphqlClient()
  expect(client).toBeDefined()
  const comments = await client.GetAllComments()
  expect(comments).toBeDefined()
})
