import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import sha256 from 'crypto-js/sha256';
import { bodyStreamToNodeStream } from 'next/dist/server/body-streams';
const MINIMUM_PASSWORD_LENGTH = 12;

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await handlePOST(res, req);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
const hashPassword = (password: string) => {
  return sha256(password).toString();
};

const isMissingFields = (body: any) => {
  return !body.email || !body.password || !body.name;
};

const isEmailNotUnique = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  return user !== null;
};

const isPasswordWeak = (password: string) => {
  // check character length only as of right now
  return password.length < MINIMUM_PASSWORD_LENGTH;
};

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  if (isMissingFields(req.body)) {
    return res.status(400).json({ message: 'Missing fields.' });
  }

  const { email, password, name } = req.body;

  if (await isEmailNotUnique(email)) {
    return res.status(400).json({ message: 'Email is not unique.' });
  }

  if (isPasswordWeak(password)) {
    return res.status(400).json({
      message: 'Your password is not strong enough.',
    });
  }

  const hashedPassword: string = hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: { email, hashedPassword, name },
  });
  return res.status(200).json({ email, name });
}
