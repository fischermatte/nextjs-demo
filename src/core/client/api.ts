import {Observable} from 'rxjs'
import {Comment} from '../shared/comment.types'
import {ajax} from 'rxjs/ajax'
import {map, take, timeout} from 'rxjs/operators'

export const api = {
  getAllComments(): Observable<Comment[]> {
    return ajax.getJSON<Comment[]>(`api/comments`).pipe(timeout(5000), take(1))
  },
  getCommentById(phraseId: string): Observable<Comment> {
    return ajax.getJSON<Comment>(`api/phrases/${phraseId}`).pipe(timeout(5000), take(1))
  },
  incrementLikesOnComment(commentId: string): Observable<number> {
    return ajax.post(`api/comments/${commentId}/increment-like`).pipe(
      timeout(5000),
      take(1),
      map(resp => resp.response.totalLikes),
    )
  },
}
