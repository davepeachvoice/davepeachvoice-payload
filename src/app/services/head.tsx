import { FC } from 'react';
import { buildTitle } from '../../lib/build-title';

const Head: FC = () => {
  const title = buildTitle('Services');

  return (
    <>
      <title>{title}</title>
      <meta property='og:title' content={title}></meta>
    </>
  );
};

export default Head;
