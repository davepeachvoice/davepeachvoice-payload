import React from 'react';
import { Box, Anchor } from 'grommet';
import { Twitter, Facebook, Linkedin } from 'grommet-icons';

export default function SocialIcons() {
  return (
    <Box>
      <Box direction='row'>
        <Anchor href='https://twitter.com/davepeach101' target='_blank'>
          <Box
            pad='small'
            round='full'
            align='center'
            hoverIndicator={{
              background: { color: '#111130' },
            }}
            onClick={() => {}}
            focusIndicator={false}
          >
            <Twitter size='medium' />
          </Box>
        </Anchor>
        <Anchor
          href='https://www.facebook.com/profile.php?id=100008652019445'
          target='_blank'
        >
          <Box
            pad='small'
            round='full'
            align='center'
            hoverIndicator={{
              background: { color: '#111130' },
            }}
            onClick={() => {}}
            focusIndicator={false}
          >
            <Facebook size='medium' />
          </Box>
        </Anchor>
        <Anchor
          href='https://www.linkedin.com/in/dave-peach-b05a347'
          target='_blank'
        >
          <Box
            pad='small'
            round='full'
            align='center'
            hoverIndicator={{
              background: { color: '#111130' },
            }}
            onClick={() => {}}
            focusIndicator={false}
          >
            <Linkedin size='medium' />
          </Box>
        </Anchor>
      </Box>
    </Box>
  );
}
