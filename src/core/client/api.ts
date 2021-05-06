import {Observable} from 'rxjs'
import {Comment, NewComment} from '../shared/comment.types'
import {ajax} from 'rxjs/ajax'
import {map, take, timeout} from 'rxjs/operators'

export const api = {
  getComments(): Observable<Comment[]> {
    return ajax.getJSON<Comment[]>(`api/comments`).pipe(timeout(5000), take(1))
  },
  getCommentById(commentId: string): Observable<Comment> {
    return ajax.getJSON<Comment>(`api/comments/${commentId}`).pipe(timeout(5000), take(1))
  },
  incrementLikesOnComment(commentId: string): Observable<Comment> {
    return ajax.post<Comment>(`api/comments/${commentId}/increment-likes`).pipe(
      timeout(5000),
      take(1),
      map(resp => resp.response),
    )
  },
  addComment(comment: NewComment): Observable<Comment> {
    return ajax.post<Comment>('api/comments/add', comment).pipe(
      timeout(5000),
      take(1),
      map(resp => resp.response),
    )
  },
}
