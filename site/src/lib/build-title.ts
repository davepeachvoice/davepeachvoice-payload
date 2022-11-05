export const buildTitle = (segment?: string) => {
  const main = 'Dave Peach: Professional Voice';
  if (!segment) return main;
  return `${main} - ${segment}`;
};
