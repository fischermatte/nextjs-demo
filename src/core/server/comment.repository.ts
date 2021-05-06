import {Comment, NewComment} from '../shared/comment.types'
import {Sdk} from '../../graphql/__generated__/graphql'
import {ManagementClient} from './contentful-management-client'
import {CommentType} from './contentful-management-client.test'
import {createGraphqlClient} from './contentful-content-client'

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

export class ContentfulCommentRepository {
  constructor(private contentReader: Sdk, private contentWriter: ManagementClient) {}

  async getById(id: string): Promise<Comment> {
    const result = await this.contentReader.GetCommentById({
      id,
    })
    return {
      id: result.comment.sys.id,
      text: result.comment.text,
      title: result.comment.title,
      likes: result.comment.likes,
    }
  }

  async incrementLike(id: string): Promise<Comment> {
    const comment = await this.getById(id)
    const entry = await this.contentWriter.updateEntryFields<CommentType>(id, {
      fields: {
        text: {
          'en-US': comment.text,
        },
        title: {
          'en-US': comment.title,
        },
        likes: {
          'en-US': comment.likes + 1,
        },
      },
    })
    return {
      id,
      title: entry.fields.title['en-US'],
      text: entry.fields.text['en-US'],
      likes: entry.fields.likes['en-US'],
    }
  }

  async getAll(): Promise<Comment[]> {
    const result = await this.contentReader.GetAllComments()
    return result.commentCollection.items.map(i => {
      return {
        id: i.sys.id,
        text: i.text,
        likes: i.likes,
        title: i.title,
      }
    })
  }

  async add(comment: NewComment): Promise<Comment> {
    const entry = await this.contentWriter.createEntry<CommentType>('comment', {
      fields: {
        text: {
          'en-US': comment.text,
        },
        title: {
          'en-US': comment.title,
        },
        likes: {
          'en-US': comment.likes,
        },
      },
    })
    return {
      id: entry.sys.id,
      text: entry.fields.text['en-US'],
      title: entry.fields.title['en-US'],
      likes: entry.fields.likes['en-US'],
    }
  }
}

// export const commentRepository = new InMemoryCommentRepository()
export const commentRepository = new ContentfulCommentRepository(createGraphqlClient(), new ManagementClient())
