import {createApolloClient} from './contentful-content-client'
import {gql} from '@apollo/client/core'

test('ContentClient', async () => {
  const client = createApolloClient()
  expect(client).toBeDefined()
  const {data} = await client.query({
    query: gql`
      query comments {
        commentCollection {
          total
          items {
            sys {
              id
            }
            text
          }
        }
      }
    `,
  })
  expect(data).toBeDefined()
})
