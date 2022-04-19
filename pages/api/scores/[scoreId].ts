import type { NextApiRequest, NextApiResponse } from 'next'
import Score from '../../../types/score'

const baseUrl = 'https://dfvqarmcqpkvgykzcglz.supabase.co/rest/v1/scores'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score>
) {
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
