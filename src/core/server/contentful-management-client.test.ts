import {ClientFactory} from './contentful-management-client'

describe('contenful tests', () => {
  test('get spaces ', async () => {
    const spaces = await ClientFactory.getInstance().getSpaces()
    expect(spaces).toBeDefined()

    const space = await ClientFactory.getInstance().getSpace(process.env.CONTENTFUL_SPACE_ID)
    const env = await space.getEnvironment('master')
    const commentType = await env.getContentType('comment')
    const snapshots = await commentType.getSnapshots()
    const data = snapshots.items.map(i => i.toPlainObject())
    expect(data).toBeDefined()
  })
})
