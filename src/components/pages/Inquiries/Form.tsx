import React, { useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';

import {
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  TextArea,
  Select,
  FormExtendedEvent,
} from 'grommet';

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
}

export default function ContactForm(props: Props) {
  const [value, setValue] = useState<FormState>(defaultValue);
  const recaptchaRef = useRef<Recaptcha>();
  const [submitButtonDisabled, setButtonDisabled] = useState(true);

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
        name='inquiry'
      >
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
          <TextArea name='request' size='small' resize='vertical'></TextArea>
        </FormField>
        <FormField label={props.attributionFieldPrompt} name='attribution'>
          <Select
            name='attribution'
            options={props.attributionFieldOptions}
            placeholder='Select'
            clear={{ label: 'Clear selection' }}
          />
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
