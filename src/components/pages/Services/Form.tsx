import { ServiceInterface } from '@components/services/ServiceInterface';
import {
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  Grid,
  MaskedInput,
  TextArea,
} from 'grommet';
import React, { useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';

const defaultValue = {
  name: '',
  email: '',
  request: '',
  attribution: '',
};

interface FormState {
  name: string;
  email: string;
  request?: string;
  attribution?: string;
}

const RECAPTCHA_KEY = '6Lf7CAMcAAAAACNXsN6-hnIxztE0lFyltbvAOnKu';

interface Props {
  requestFieldPrompt: string;
  attributionFieldPrompt: string;
  attributionFieldOptions: string[];
  services: ServiceInterface[];
}

export function ContactForm(props: Props) {
  const [value, setValue] = useState<FormState>(defaultValue);
  const recaptchaRef = useRef<Recaptcha>();
  const [submitButtonDisabled, setButtonDisabled] = useState(true);
  const [fullFormVisible, setFullFormVisible] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<string>(
    undefined
  );

  return (
    <Box width='medium'>
      <Form<FormState>
        value={value}
        onChange={(nextValue, { touched }) => {
          console.log('Change', nextValue, touched);
          setValue(nextValue);
        }}
        onReset={() => setValue(defaultValue)}
        onSubmit={handleSubmit}
        data-netlify='true'
        data-netlify-recaptcha='true'
        name='service'
      >
        <Grid
          columns={{ count: props.services.length, size: ['small', 'small'] }}
          rows='xxsmall'
          gap={{ row: 'medium' }}
          justifyContent='center'
          justify='center'
          alignContent='center'
        >
          {props.services.map((item) => (
            <Box
              width='100%'
              key={item.title}
              background={selectedService === item.title ? 'white' : 'grey'}
              border={{
                color: 'black',
              }}
              align='center'
              justify='center'
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                if (selectedService !== item.title) {
                  setSelectedService(item.title);
                  setFullFormVisible(true);
                } else {
                  setSelectedService(undefined);
                  setFullFormVisible(false);
                }
              }}
            >
              {item.title}
            </Box>
          ))}
        </Grid>
        {fullFormVisible ? (
          <Box>
            <FormField label='Name' name='name' required />
            <FormField label='Email' name='email' required>
              <MaskedInput
                name='email'
                mask={[
                  { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                  { fixed: '@' },
                  { regexp: /^[\w]+$/, placeholder: 'my' },
                  { fixed: '.' },
                  { regexp: /^[\w]+$/, placeholder: 'com' },
                ]}
                type='email'
              />
            </FormField>
            <FormField label={props.requestFieldPrompt} name='request'>
              <TextArea
                name='request'
                size='small'
                resize='vertical'
              ></TextArea>
            </FormField>
            <FormField>
              <Recaptcha
                ref={recaptchaRef}
                sitekey={RECAPTCHA_KEY}
                size='normal'
                onChange={() => setButtonDisabled(false)}
              />
            </FormField>
            <Box direction='row' justify='end' margin={{ top: 'medium' }}>
              <Button
                type='submit'
                disabled={submitButtonDisabled}
                label='Submit'
              />
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Form>
    </Box>
  );

  function handleSubmit(event: FormExtendedEvent<FormState, Element>) {
    event.preventDefault();

    // TODO: better types
    const form = event.target as Element;
    const recaptchaValue = recaptchaRef.current.getValue();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        'g-recaptcha-response': recaptchaValue,
        ...value,
      }),
    };

    fetch('/', options).catch((error) => alert(error));
  }
}

function encode(
  data: { 'form-name': string; 'g-recaptcha-response': string } & FormState
) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}
