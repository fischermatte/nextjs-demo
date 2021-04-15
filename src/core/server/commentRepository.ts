import {Comment} from '../shared/comment.types'

class PhraseRepository {
  private db = {}

  async getById(id: string): Promise<Comment> {
    return this.db[id]
  }

  async incrementLike(id: string): Promise<Comment> {
    const phrase = await this.getById(id)
    phrase.totalLikes = phrase.totalLikes + 1
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

export const commentRepository = new PhraseRepository()
