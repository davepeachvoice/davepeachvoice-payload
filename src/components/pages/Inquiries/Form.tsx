import React, { useState } from 'react';
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

export default function ContactForm() {
  const [value, setValue] = useState<FormState>(defaultValue);
  const recaptchaRef = React.createRef();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

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
        <FormField label='What can I do for you?' name='request'>
          <TextArea name='request' size='small' resize='vertical'></TextArea>
        </FormField>
        <FormField label='How did you hear about me?' name='attribution'>
          <Select
            name='attribution'
            options={['Internet search', 'Word of mouth']}
            placeholder='Select'
            clear={{ label: 'Clear selection' }}
          />
        </FormField>
        <FormField>
          <Recaptcha
            ref={recaptchaRef}
            sitekey={RECAPTCHA_KEY}
            size='normal'
            id='recaptcha-google'
            onChange={() => setButtonDisabled(false)}
          />
        </FormField>
        <Box direction='row' justify='end' margin={{ top: 'medium' }}>
          <Button type='submit' label='Submit' />
        </Box>
      </Form>
    </Box>
  );

  function handleSubmit(event: FormExtendedEvent<FormState, Element>) {
    event.preventDefault();

    const form = event.target;
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

function encode(data: { 'form-name': string } & FormState) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}
