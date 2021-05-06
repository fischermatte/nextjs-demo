export interface Comment {
  id: string
  title: string
  text: string
  likes: number
}

export type NewComment = Omit<Comment, 'id'>
