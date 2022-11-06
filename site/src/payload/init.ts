import payload from '@mattddean/payload';
import express from 'express';

export function getPayloadClient() {
  const app = express();

  const payloadServerUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL;
  if (!payloadServerUrl)
    throw new Error('PAYLOAD_PUBLIC_SERVER_URL is not set');

  if (!payload.initialized) {
    payload.init({
      secret: process.env.PAYLOAD_SECRET_KEY,
      mongoURL: process.env.MONGO_FULL_URL,
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
      config: {
        serverURL: payloadServerUrl,
        collections: [],
        globals: [],
      },
    });
  }

  return payload;
}
