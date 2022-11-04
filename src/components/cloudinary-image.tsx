'use client';

import NextImage from 'next/image';
import { imageLoader } from '../common/cloudinary';

/**
 * This simple wrapper serves to ensure that Cloudinary Images are always
 * rendered as Client Components so that we can pass the cloudinary image
 * loader function to them. Functions are not serializable such that they
 * can be passed from Server to Client Components.
 */
const CloudinaryImage: typeof NextImage = (props) => {
  return <NextImage loader={imageLoader} {...props} />;
};

export default CloudinaryImage;
