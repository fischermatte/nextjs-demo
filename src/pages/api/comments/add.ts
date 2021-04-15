import {NextApiRequest, NextApiResponse} from 'next'
import {Comment} from '../../../core/shared/comment.types'
import {commentRepository} from '../../../core/server/commentRepository'
import {ErrorResponseBody} from '../../../core/server/error.types'

export default async function incrementLikes(
  req: NextApiRequest,
  res: NextApiResponse<Comment | ErrorResponseBody>,
): Promise<void> {
  try {
    const comment = await commentRepository.add(req.body as Comment)
    res.status(200).json(comment)
  } catch (e) {
    // something went wrong
    res.status(500).json({error: e.message})
  }
}
