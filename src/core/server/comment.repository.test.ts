import {createGraphqlClient} from './contentful-content-client'
import {ContentfulCommentRepository} from './comment.repository'
import {ManagementClient} from './contentful-management-client'

describe('ContentfulCommentRepository', () => {
  test('getAll', async () => {
    const repo = new ContentfulCommentRepository(createGraphqlClient(), new ManagementClient())
    const comments = await repo.getAll()
    expect(comments).toBeDefined()
  })
  test('incrementLike', async () => {
    const repo = new ContentfulCommentRepository(createGraphqlClient(), new ManagementClient())
    const comments = await repo.getAll()
    const comment = await repo.incrementLike(comments[0].id)
    expect(comment).toBeDefined()
  })
  test('add', async () => {
    const repo = new ContentfulCommentRepository(createGraphqlClient(), new ManagementClient())
    const comment = await repo.add({
      text: 'text 1',
      title: 'title 1',
      likes: 0,
    })
    expect(comment).toBeDefined()
  })
})
