import {NextApiRequest, NextApiResponse} from 'next'
import {NewComment} from '../../../core/shared/comment.types'
import {commentRepository} from '../../../core/server/comment.repository'
import {ErrorResponseBody} from '../../../core/server/error.types'

export default async function addComment(
  req: NextApiRequest,
  res: NextApiResponse<NewComment | ErrorResponseBody>,
): Promise<void> {
  try {
    const comment = await commentRepository.add(req.body as NewComment)
    res.status(200).json(comment)
  } catch (e) {
    // something went wrong
    res.status(500).json({error: e.message})
  }
}
