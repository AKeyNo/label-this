import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Data = {
  descriptions?: string[];
  label?: string[];
  message?: string;
};

type token = {
  name?: string;
  email: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = (await getToken({ req, secret })) as token;

  if (!token) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  const { name, email, picture, sub, iat, exp, jti } = token;
  const { title, prompt, label } = req.body;
  if (Date.now() / 1000 < exp) {
    return res.status(401).json({ message: 'Token expired.' });
  }

  switch (req.method) {
    case 'POST':
      const createNewLabel = await prisma.textLabelPrompts.create({
        data: { creatorId: sub, title, prompt },
      });
      res.status(200).json(req.body);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
