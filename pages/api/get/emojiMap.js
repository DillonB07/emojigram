// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {emojis} from '../../../utils/constants'

export default function handler(req, res) {
  let emoji = emojis[Math.floor(Math.random() * emojis.length)]

  res.status(200).json({ emoji })
}
