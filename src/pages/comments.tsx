import LayoutComponent from '../components/layout.component'
import dynamic from 'next/dynamic'
import React, {BaseSyntheticEvent, useState} from 'react'
import styles from './comments.module.css'
import {api} from '../core/client/api'
import {GetServerSideProps} from 'next'

interface Props {
  comments: Comment[]
}

const CommentDetailDialog = dynamic(() => import('../components/comment-detail-dialog'))

export const getServerSideProps: GetServerSideProps = async () => {
  const comments = await api.getAllComments().toPromise()
  return {comments: comments}
}

const Comments: React.FC<Props> = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (e: BaseSyntheticEvent): void => {
    e.preventDefault()
    setModalOpen(false)
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>c-1</td>
            <td>text</td>
            <td>
              <a
                role="button"
                className="link underline text-accent-normal"
                tabIndex={0}
                onClick={e => openModal(e)}
                onKeyDown={e => {
                  if (e.key === 'Enter') openModal(e)
                }}
              >
                Edit
              </a>
              {modalOpen && <CommentDetailDialog commentId="c-1" onClose={closeModal} />}

              <a className="link underline text-accent-normal ml-4">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn mt-6 ">New Comment</button>
    </LayoutComponent>
  )
}
export default Comments
