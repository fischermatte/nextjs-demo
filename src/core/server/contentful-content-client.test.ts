import {ContentClientFactory} from './contentful-content-client'

test('ContentClient', async () => {
  const client = ContentClientFactory.getInstance()
  expect(client).toBeDefined()
})
