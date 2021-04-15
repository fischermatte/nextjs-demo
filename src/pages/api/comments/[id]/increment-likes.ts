import {NextApiRequest, NextApiResponse} from 'next'
import {Comment} from '../../../../core/shared/comment.types'
import {commentRepository} from '../../../../core/server/commentRepository'
import {ErrorResponseBody} from '../../../../core/server/error.types'

export default async function incrementLikes(
  req: NextApiRequest,
  res: NextApiResponse<Pick<Comment, 'totalLikes'> | ErrorResponseBody>,
): Promise<void> {
  try {
    const phrase = await commentRepository.incrementLike(req.query.id as string)
    res.status(200).json({totalLikes: phrase.totalLikes})
  } catch (e) {
    // something went wrong
    res.status(500).json({error: e.message})
  }
}
