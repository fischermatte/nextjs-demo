import {Comment} from '../shared/comment.types'

class PhraseRepository {
  private db = {
    'c-1': {
      id: 'c-1',
      title: 'A dynamic fetched title',
      text: 'A dynamic fetched text',
      totalLikes: 0,
    },
  }

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
}

export const commentRepository = new PhraseRepository()
