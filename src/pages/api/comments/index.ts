import {NextApiRequest, NextApiResponse} from 'next'
import {Comment} from '../../../core/shared/comment.types'
import {ErrorResponseBody} from '../../../core/server/error.types'
import {commentRepository} from '../../../core/server/commentRepository'

export default async function getComments(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | ErrorResponseBody>,
): Promise<void> {
  try {
    const comments = await commentRepository.getAll()
    res.status(200).json(comments)
  } catch (e) {
    // something went wrong
    res.status(500).json({error: e.message})
  }
}
