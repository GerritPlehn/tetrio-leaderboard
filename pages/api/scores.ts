// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateReplay } from '../../lib/validateScore'

type Data = {
  data: string
}

const baseUrl = 'https://dfvqarmcqpkvgykzcglz.supabase.co/rest/v1/scores'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_KEY || '',
      Prefer: 'return=representation,count=exact',
    },
  }
  if (req.method === 'POST') {
    const validationResult = validateReplay(req.body?.replay)
    if (!validationResult.valid) {
      return res.status(400).send({ data: validationResult.message as string })
    }
    requestInit.method = 'POST'
    requestInit.body = JSON.stringify(req.body)
    const response = await fetch(
      `${baseUrl}?select=id,name,replay->endcontext->score,replay->endcontext->level`,
      requestInit
    )
    const body = (await response.json())[0]
    return res.setHeader('Location', `/score/${body.id}`).status(201).json(body)
  } else if (req.method === 'GET') {
    let page = 0 || Number(req.query['page'])
    const pageSize = 10

    const response = await fetch(
      `${baseUrl}?select=id,name,replay->endcontext->score,replay->endcontext->level&order=replay->endcontext->score.desc&offset=${
        page * pageSize
      }&limit=10`,
      requestInit
    )
    return res
      .setHeader('content-range', `${response.headers.get('content-range')}`)
      .status(200)
      .json(await response.json())
  }
  res.status(200).json({ data: 'John Doe' })
}
