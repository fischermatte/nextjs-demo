import LayoutComponent from '../components/layout.component'
import dynamic from 'next/dynamic'
import React, {BaseSyntheticEvent, useState} from 'react'
import styles from './comments.module.css'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import {Comment} from '../core/shared/comment.types'
import {commentRepository} from '../core/server/commentRepository'
import {api} from '../core/client/api'
import {v4} from 'uuid'
import {switchMap} from 'rxjs/operators'

interface Props {
  comments: Comment[]
}

const CommentDetailDialog = dynamic(() => import('../components/comment-detail-dialog'))

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
  console.info(`URL: ${context.resolvedUrl}`)
  const comments: Comment[] = await commentRepository.getAll().catch(error => {
    console.error(error)
    return []
  })
  return {
    props: {
      comments,
    },
  }
}

const Comments: React.FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>(props.comments)
  const openCommentDialog = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(true)
  }

  const closeCommentDialog = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(false)
  }

  const addComment = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    api
      .addComment({
        id: v4(),
        text: 'some text',
        title: 'some title',
        totalLikes: 0,
      })
      .pipe(switchMap(() => api.getComments()))
      .subscribe(comments => {
        setComments(comments)
      })
  }

  return (
    <LayoutComponent>
      <div className="flex justify-center items-center bg-accent-normal text-accent-dark text-xl h-32">Heyho</div>
      <h1 className="mt-12">Comments</h1>

      <table className={styles.commentsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.text}</td>
              <td>
                <a
                  role="button"
                  className="link underline text-accent-normal"
                  tabIndex={0}
                  onClick={e => openCommentDialog(e)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') openCommentDialog(e)
                  }}
                >
                  Edit
                </a>
                {modalOpen && <CommentDetailDialog commentId={comment.id} onClose={closeCommentDialog} />}

                <a className="link underline text-accent-normal ml-4">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn mt-6" onClick={e => addComment(e)}>
        New Comment
      </button>
    </LayoutComponent>
  )
}
export default Comments
