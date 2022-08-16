import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  descriptions: string[];
  label: string[];
};

const tempDescriptions: string[] = [
  'Have a good day!',
  'Have a good night!',
  'I hope you have wet socks everyday.',
  'Today is Saturday.',
];
const tempLabel: string[] = ['positive', 'negative', 'neutral'];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({
        descriptions: tempDescriptions,
        label: tempLabel,
      });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
