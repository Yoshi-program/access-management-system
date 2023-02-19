import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 200
  res.status(statusCode).json({ name: 'John Doe' })
}

export default handler
