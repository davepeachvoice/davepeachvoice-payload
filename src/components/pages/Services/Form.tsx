import { ServiceInterface } from '@components/services/ServiceInterface';
import {
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  Grid,
  MaskedInput,
  Select,
  TextArea,
} from 'grommet';
import React, { useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';

const defaultValue: FormState = {
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
  step0Header: string;
  step1Header: string;
  attributionFieldPrompt: string;
  attributionFieldOptions: string[];
  services: ServiceInterface[];
}

export function ContactForm(props: Props) {
  const [value, setValue] = useState<FormState>(defaultValue);
  const recaptchaRef = useRef<Recaptcha>();
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const [fullFormVisible, setFullFormVisible] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<string>(
    undefined
  );
  const [formStep, setFormStep] = useState(0);

  function readyToNavigateToNextStep() {
    setFormStep(formStep + 1);
  }

  function readyToNavigateToPreviousStep() {
    setFormStep(formStep - 1);
  }

  return (
    <Box width='large'>
      <Form<FormState>
        value={value}
        onChange={setValue}
        onReset={() => setValue(defaultValue)}
        onSubmit={handleSubmit}
        data-netlify='true'
        data-netlify-recaptcha='true'
        name='BasicServiceRequest'
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
              background={selectedService === item.title ? '#eee' : 'grey'}
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
        <Box
          margin={{
            top: '40px',
          }}
        >
          <RenderFormBody
            visible={fullFormVisible}
            formStep={formStep}
            readyToNavigateToNextStep={readyToNavigateToNextStep}
            readyToNavigateToPreviousStep={readyToNavigateToPreviousStep}
            step0Header={props.step0Header}
            step1Header={props.step1Header}
            attributionFieldPrompt={props.attributionFieldPrompt}
            attributionFieldOptions={props.attributionFieldOptions}
            submitButtonEnabled={submitButtonEnabled}
            setSubmitButtonEnabled={setSubmitButtonEnabled}
            recaptchaRef={recaptchaRef}
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

interface RenderFormBodyInput {
  visible: boolean;
  step0Header: string;
  step1Header: string;
  setSubmitButtonEnabled: (newValue: boolean) => void;
  submitButtonEnabled: boolean;
  recaptchaRef: React.MutableRefObject<Recaptcha>;
  formStep: number;
  readyToNavigateToNextStep: () => void;
  readyToNavigateToPreviousStep: () => void;
  attributionFieldPrompt: string;
  attributionFieldOptions: string[];
}

function RenderFormBody(input: RenderFormBodyInput) {
  return (
    <div style={{ display: input.visible ? undefined : 'none' }}>
      <Step0 {...input} visible={input.formStep === 0}></Step0>
      <Step1 {...input} visible={input.formStep === 1}></Step1>
    </div>
  );
}

interface Step0Props {
  step0Header: string;
  readyToNavigateToNextStep: () => void;
  visible: boolean;
}

function Step0(props: Step0Props) {
  console.log('step0 visible', props.visible);
  return (
    <Box style={{ display: props.visible ? undefined : 'none' }}>
      <StepHeader text={props.step0Header}></StepHeader>
      <FormTextArea></FormTextArea>
      <Box align='end'>
        <FormButton onClick={props.readyToNavigateToNextStep} label='Next' />
      </Box>
    </Box>
  );
}

interface Step1Props {
  setSubmitButtonEnabled: (newValue: boolean) => void;
  submitButtonEnabled: boolean;
  recaptchaRef: React.MutableRefObject<Recaptcha>;
  readyToNavigateToPreviousStep: () => void;
  attributionFieldPrompt: string;
  attributionFieldOptions: string[];
  step1Header: string;
  visible: boolean;
}

function Step1(props: Step1Props) {
  console.log('step1 visible', props.visible);
  return (
    <Box style={{ display: props.visible ? undefined : 'none' }}>
      <StepHeader text={props.step1Header}></StepHeader>
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
          ref={props.recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          size='normal'
          onChange={() => props.setSubmitButtonEnabled(true)}
        />
      </FormField>
      <Box direction='row' justify='between' margin={{ top: 'medium' }}>
        <FormButton
          label='Back'
          unfilled
          onClick={props.readyToNavigateToPreviousStep}
        />
        <FormButton
          label='Submit'
          type='submit'
          disabled={!props.submitButtonEnabled}
        />
      </Box>
    </Box>
  );
}

interface FormButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  // TODO: consider getting type's type from Grommet's Button
  type?: 'button' | 'submit' | 'reset';
  unfilled?: boolean;
}

function FormButton(props: FormButtonProps) {
  return (
    <Button
      size='medium'
      label={props.label}
      type={props.type}
      style={{
        width: '150px',
        borderRadius: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        backgroundColor: props.unfilled ? '#222' : null,
        color: props.unfilled ? 'white' : null,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
}

interface FormTextAreaProps {
  label?: string;
}

function FormTextArea(props: FormTextAreaProps) {
  return (
    <FormField label={props.label} name='request'>
      <TextArea
        style={{
          backgroundColor: '#eee',
          color: '#444',
        }}
        color='red'
        name='request'
        size='small'
        resize='vertical'
      ></TextArea>
    </FormField>
  );
}

interface StepHeaderProps {
  text: string;
}

function StepHeader(props: StepHeaderProps) {
  return (
    <div style={{ fontSize: '24px', marginBottom: '20px' }}>{props.text}</div>
  );
}
