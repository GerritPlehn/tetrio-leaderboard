import type { NextApiRequest, NextApiResponse } from 'next'
import type { ValidationResult } from '../../../types/validationResult'
import { validateReplay } from '../../../lib/validateScore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidationResult>
) {
  if (req.method === 'POST') {
    const replay = req.body
    const validationResult = validateReplay(replay)
    const status = validationResult.valid ? 200 : 400
    res.status(status).send(validationResult)
  }
}
