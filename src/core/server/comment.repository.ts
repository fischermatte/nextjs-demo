import {Comment} from '../shared/comment.types'

class InMemoryCommentRepository {
  private db = {}

  async getById(id: string): Promise<Comment> {
    if (!this.db[id]) {
      throw new Error(`comment with id ${id} not found`)
    }
    return this.db[id]
  }

  async incrementLike(id: string): Promise<Comment> {
    const phrase = await this.getById(id)
    phrase.likes = phrase.likes + 1
    return phrase
  }

  async getAll(): Promise<Comment[]> {
    return Object.values(this.db)
  }

  async add(comment: Comment): Promise<Comment> {
    this.db[comment.id] = comment
    return Promise.resolve(comment)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ContentfulCommentRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getById(id: string): Promise<Comment> {
    throw new Error('not yet implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async incrementLike(id: string): Promise<Comment> {
    throw new Error('not yet implemented')
  }

  async getAll(): Promise<Comment[]> {
    throw new Error('not yet implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(comment: Comment): Promise<Comment> {
    throw new Error('not yet implemented')
  }
}

export const commentRepository = new InMemoryCommentRepository()
