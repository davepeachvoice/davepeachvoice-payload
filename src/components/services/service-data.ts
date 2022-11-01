import { ServiceInterface } from './ServiceInterface';

/**
 * https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
 * second flag in require.context function is if subdirectories should be searched
 */
export async function importServices() {
  const markdownFiles: string[] = require
    .context('/content/services', false, /\.\/.*\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  type ServicesMarkdownData = {
    default: {
      attributes: ServiceInterface;
    };
    attributes: ServiceInterface;
  };

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown: ServicesMarkdownData = await import(
        `/content/services/${path}`
      );
      return { ...markdown };
    })
  );
}
