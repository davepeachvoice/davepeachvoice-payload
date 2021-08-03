import React, { useState } from 'react';

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

export default function ContactForm() {
  const [value, setValue] = useState<FormState>(defaultValue);
  return (
    <Box align='center' justify='center'>
      <Box width='medium'>
        <Form<FormState>
          value={value}
          onChange={(nextValue, { touched }) => {
            console.log('Change', nextValue, touched);
            setValue(nextValue);
          }}
          onReset={() => setValue(defaultValue)}
          onSubmit={handleSubmit}
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
          <FormField
            label='What can I do for you?'
            name='request'
            component={TextArea}
            required={false}
          />
          <FormField label='How did you hear about me?' name='attribution'>
            <Select
              name='attribution'
              options={['Internet search', 'Word of mouth']}
              placeholder='Select'
              clear={{ label: 'Clear selection' }}
            />
          </FormField>
          <Box direction='row' justify='between' margin={{ top: 'medium' }}>
            <Button type='submit' label='Submit' />
          </Box>
        </Form>
      </Box>
    </Box>
  );

  function handleSubmit(event: FormExtendedEvent<FormState, Element>) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'inquiry', ...value }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));

    event.preventDefault();
  }
}

function encode(data: { 'form-name': string } & FormState) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}
