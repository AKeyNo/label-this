/*
If the authorization is successful, the server will return the respective item to be labeled and recorded.

Temporarily will give a random item from a local list of items.
*/
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  description: string;
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
  const randomNumber = Math.floor(Math.random() * tempDescriptions.length);
  const temp = tempDescriptions[randomNumber];

  console.log(randomNumber, temp, tempLabel);

  res.status(200).json({
    description: temp,
    label: tempLabel,
  });
}
