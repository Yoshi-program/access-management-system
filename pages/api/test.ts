import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 200
  console.log(req.body)
  switch (req.method) {
    case 'POST': {
      res.status(statusCode).json({ qrcode: req.body.qrcode })
      break
    }
    default: {
      res.status(statusCode).json({ name: 'John Doe' })
      break
    }
  }
}

export default handler
