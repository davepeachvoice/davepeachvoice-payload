import { graphQLHandler } from '@mattddean/payload/dist/next';
import { PayloadRequest } from '@mattddean/payload/types';
import type { Response } from 'express';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPayloadClient } from '../../../payload/init';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = getPayloadClient();
  const request = req as unknown as PayloadRequest<any>;
  request.payload = payload;
  const handler = graphQLHandler(request, res as unknown as Response);

  await handler(request, res as unknown as Response);
}
