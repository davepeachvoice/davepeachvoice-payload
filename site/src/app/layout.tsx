import { Open_Sans } from '@next/font/google';
import classNames from 'classnames';
import { FC } from 'react';
import NavigationBar from '../components/NavigationBar';
import SocialIcons from '../components/SocialIcons';
import '../globals.css';

interface Props {
  title: string;
  children?: React.ReactNode;
}

// this site's default font family
const openSans = Open_Sans({ subsets: ['latin'] });

const Layout: FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <div
          className={classNames(openSans.className, 'w-full bg-neutral-900')}
        >
          <NavigationBar></NavigationBar>
          <article className='flex flex-1 flex-col'>{children}</article>
          <footer className='flex justify-center items-center pb-6 mt-10 w-full'>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              <SocialIcons></SocialIcons>
              <div className='flex justify-center align-center w-full h-full text-[silver]'>
                Copyright © {new Date().getFullYear()} Dave Peach
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
