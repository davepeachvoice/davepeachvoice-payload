import { buildConfig } from '@mattddean/payload/config';
import dotenv from 'dotenv';
import Users from '../cms/src/collections/Users';

dotenv.config()

const payloadServerUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL
if (!payloadServerUrl) throw new Error('PAYLOAD_PUBLIC_SERVER_URL is not set')

export default buildConfig({
  serverURL: payloadServerUrl,
  collections: [Users],
  globals: [],
})
