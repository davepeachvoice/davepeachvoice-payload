import payload from '@mattddean/payload';
import express from 'express';

export function getPayloadClient() {
  const app = express();

  if (!payload.initialized) {
    payload.init({
      secret: process.env.PAYLOAD_SECRET_KEY,
      mongoURL: process.env.MONGO_FULL_URL,
      // mongoOptions: {
      //   user: process.env.MONGO_PAYLOAD_USER,
      //   pass: process.env.MONGO_PAYLOAD_PASSWORD,
      // },
      express: app,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  }

  return payload;
}
