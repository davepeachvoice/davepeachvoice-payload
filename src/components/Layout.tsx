import { Box, Grommet, Text } from 'grommet';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavigationBar from './NavigationBar';
import SocialIcons from './SocialIcons';

const theme = {
  name: 'aruba',
  rounding: 4,
  spacing: 24,
  defaultMode: 'light',
  global: {
    colors: {
      brand: '#DADADA',
      background: {
        dark: '#111115',
        light: '#FFFFFF',
      },
      'background-back': {
        dark: '#111115',
        light: '#EEEEEE',
      },
      'background-front': {
        dark: '#222222',
        light: '#FFFFFF',
      },
      'background-contrast': {
        dark: '#FFFFFF11',
        light: '#11111111',
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444',
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666',
      },
      border: {
        dark: '#444444',
        light: '#CCCCCC',
      },
      control: {
        light: '#ED6F00',
        dark: '#EF8B27',
      },
      'active-background': 'background-contrast',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#dd3000',
      'status-warning': '#f0c954',
      'status-ok': '#ff9400',
      'status-unknown': '#C3C5C8',
      'status-disabled': '#C3C5C8',
      'graph-0': 'brand',
      'graph-1': 'blue',
      green: {
        dark: '#d5d848',
        light: '#d5d848',
      },
      'green!': '#d5d848',
      blue: {
        dark: '#9fd4c9',
        light: '#004876',
      },
      'blue!': '#9fd4c9',
      grey: {
        dark: '#646569',
        light: '#646569',
      },
      'grey!': '#646569',
      'graph-2': 'green',
    },
    focus: {
      border: {
        color: 'transparent',
      },
    },
    font: {
      family: '"Open Sans"',
      face: `
        /* cyrillic-ext */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek-ext */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin */
        @font-face {
          font-family: 'Orbitron';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/orbitron/v19/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }`,
    },
    active: {
      background: 'active-background',
      color: 'active-text',
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
  },
  button: {
    default: {
      background: {
        color: {
          dark: 'status-ok',
          light: 'status-ok',
        },
      },
    },
  },
  anchor: {
    color: 'var(--status-ok)',
    outline: 'none',
    hover: {
      textDecoration: 'none',
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: '#111111',
      light: '#FFFFFF',
    },
  },
  date: '2020-02-14T21:38:28.000Z',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
};

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function Layout(props: Props) {
  const mainTitle = 'Dave Peach: Professional Voice';
  const fullTitle = props.title ? `${props.title} - ${mainTitle}` : mainTitle;

  const description =
    'Dave Peach is a male voice actor ready to help your clients build their brands. Learn how today.';

  // TODO: is there some way to generate the cloudinary part programmatically using next/image
  const metaImage =
    'https://res.cloudinary.com/prestocloud/image/upload/f_auto,c_limit,w_640,q_auto/dave-peach-web-netlify-cms/march_madness.png';

  // only used to get the current path for meta properties
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name='description' content={description}></meta>
        <meta property='og:title' content={fullTitle}></meta>
        <meta property='og:type' content='article'></meta>
        <meta property='og:url' content={router.asPath}></meta>
        <meta property='og:image' content={metaImage}></meta>
        <meta property='og:description' content={description}></meta>

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='https://res.cloudinary.com/prestocloud/image/upload/v1642970801/dave-peach-web-netlify-cms/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='https://res.cloudinary.com/prestocloud/image/upload/v1642970801/dave-peach-web-netlify-cms/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='https://res.cloudinary.com/prestocloud/image/upload/v1642970801/dave-peach-web-netlify-cms/favicon/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='https://res.cloudinary.com/prestocloud/raw/upload/v1642970801/dave-peach-web-netlify-cms/favicon/site.webmanifest'
        />
      </Head>
      <Grommet cssVars={true} full theme={theme} themeMode='dark'>
        <Box fill>
          <NavigationBar></NavigationBar>
          <article style={contentStyle}>{props.children}</article>
          <footer
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 25,
              marginTop: 100,
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              <SocialIcons></SocialIcons>
              <Text
                textAlign='center'
                style={{
                  width: '100%',
                }}
                size='small'
                color='silver'
              >
                Copyright © {new Date().getFullYear()} Dave Peach
              </Text>
            </div>
          </footer>
        </Box>
      </Grommet>
    </>
  );
}
