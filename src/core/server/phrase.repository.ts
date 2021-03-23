import {Phrase} from '../shared/phrase.types'

class PhraseRepository {
  private db = {
    'p-1': {
      id: 'p-1',
      title: 'A dynamic fetched title',
      text: 'A dynamic fetched text',
      totalLikes: 0,
    },
  }

  async getById(id: string): Promise<Phrase> {
    return this.db[id]
  }

  async like(id: string): Promise<Phrase> {
    const phrase = await this.getById(id)
    phrase.totalLikes = phrase.totalLikes + 1
    return phrase
  }
}

export const phraseRepository = new PhraseRepository()
