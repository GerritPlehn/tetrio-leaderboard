import type { NextApiRequest, NextApiResponse } from 'next'
import Score from '../../../types/score'

const competitionStart = new Date(
  process.env.COMP_START_DATE || '2022-09-01T00:00:00.000Z'
)
const competitionEnd = new Date(
  process.env.COMP_END_DATE || '2022-10-01T00:00:00.000Z'
)

const baseUrl = 'https://dfvqarmcqpkvgykzcglz.supabase.co/rest/v1/scores'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score | unknown>
) {
  if (new Date() < competitionEnd) {
    return res
      .status(401)
      .json({
        message: `Scores available after competition ends at ${competitionEnd.toISOString()}`,
      })
  }

  const requestInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY || '',
      accept: 'application/vnd.pgrst.object+json',
    },
  }
  const { scoreId } = req.query
  const response = await fetch(
    `${baseUrl}?select=id,name,replay&id=eq.${scoreId}`,
    requestInit
  )
  res.status(200).json(await response.json())
}
