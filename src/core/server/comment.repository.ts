import {Comment} from '../shared/comment.types'
import {v4} from 'uuid'

class CommentRepository {
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

export const commentRepository = new CommentRepository()
commentRepository.add({
  id: v4(),
  title: 'example-title',
  text: 'example-text',
  likes: 0,
})
