import Link from 'next/link';
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

export default function SocialIcons() {
  return (
    <div className='w-full flex justify-center'>
      <Link
        href='https://twitter.com/davepeach101'
        target='_blank'
        rel='noreferrer'
        className='p-2 rounded-full items-center'
        style={{ backgroundColor: '#111130' }}
      >
        <FaTwitterSquare size='1.75em' color='white' />
      </Link>
      <Link
        href='https://www.facebook.com/profile.php?id=100008652019445'
        target='_blank'
        rel='noreferrer'
        className='p-2 rounded-full items-center'
        style={{ backgroundColor: '#111130' }}
      >
        <FaFacebookSquare size='1.75em' color='white' />
      </Link>
      <Link
        href='https://www.linkedin.com/in/dave-peach-b05a347'
        target='_blank'
        rel='noreferrer'
        className='p-2 rounded-full items-center'
        style={{ backgroundColor: '#111130' }}
      >
        <FaLinkedin size='1.75em' color='white' />
      </Link>
    </div>
  );
}
