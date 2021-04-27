import React, {BaseSyntheticEvent, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {Comment} from '../core/shared/comment.types'
import {api} from '../core/client/api'

interface Props {
  commentId: string
  onClose: (e: BaseSyntheticEvent) => void
}

const CommentDetailDialog: React.FC<Props> = props => {
  const [comment, setComment] = useState<Comment>({} as any)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.info(`comment id: ${props.commentId}`)
    const subscription = api.getCommentById(props.commentId).subscribe(
      (comment: Comment) => {
        console.info(`received comment ${comment?.text}`)
        setComment(comment)
        setLoading(false)
        setError(false)
      },
      (error: any) => {
        setLoading(false)
        setError(true)
        console.error('failed to load comment', error)
      },
    )
    return () => subscription.unsubscribe()
  }, [props.commentId])

  function onLike(event: BaseSyntheticEvent): void {
    event.stopPropagation()
    api.incrementLikesOnComment(props.commentId).subscribe(totalLikes => {
      setComment({
        ...comment,
        likes: totalLikes,
      })
    })
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-90 flex text-accent-dark">
      <div className="relative p-6 bg-accent-normal w-full max-w-2xl m-auto flex-col flex">
        {loading && <div className="py-2">Loading...</div>}
        {!loading && !error && (
          <div>
            <div className="font-bold py-2 text-lg">{comment?.title}</div>
            <div className="mb-2">{comment?.text}</div>
            <div className="mb-2">
              <div className="py-4 text-accent-dark select-none ">
                <div className="text-4xl">
                  <a
                    className="hover:text-accent-contrast"
                    role="button"
                    title="Like it"
                    tabIndex={0}
                    onClick={e => onLike(e)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') onLike(e)
                    }}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span className="ml-2">{comment?.likes}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && error && <div>Failed loading data </div>}
        <div className="text-center py-2 select-none">
          <button
            className="text-accent-normal bg-accent-dark py-2 px-4 hover:bg-accent-contrast"
            tabIndex={0}
            onClick={e => props.onClose(e)}
            onKeyDown={e => {
              if (e.key === 'Enter') props.onClose(e)
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
export default CommentDetailDialog
