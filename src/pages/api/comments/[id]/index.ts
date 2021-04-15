import {NextApiRequest, NextApiResponse} from 'next'
import {Comment} from '../../../../core/shared/comment.types'
import {commentRepository} from '../../../../core/server/commentRepository'
import {ErrorResponseBody} from '../../../../core/server/error.types'

export default async function getCommentById(
  req: NextApiRequest,
  res: NextApiResponse<Comment | ErrorResponseBody>,
): Promise<void> {
  try {
    const comment = await commentRepository.getById(req.query.id as string)
    res.status(200).json(comment)
  } catch (e) {
    // something went wrong
    res.status(500).json({error: e.message})
  }
}
