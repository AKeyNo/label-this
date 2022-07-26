import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import sha256 from 'crypto-js/sha256';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await handlePOST(res, req);
      break;
    case 'DELETE':
      await handleDELETE(res, req);
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
  return (
    password.length < parseInt(process.env.MINIMUM_PASSWORD_LENGTH ?? '12')
  );
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

// DELETE /api/user
async function handleDELETE(res: NextApiResponse, req: NextApiRequest) {
  // TODO: Add a way to make any user not be able to delete users.
  try {
    await prisma.$queryRaw`TRUNCATE TABLE public."User" CASCADE`;
    return res
      .status(200)
      .json({ message: 'Successfully truncated User table.' });
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}
