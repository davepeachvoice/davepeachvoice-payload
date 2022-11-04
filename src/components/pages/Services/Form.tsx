'use client';

import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Recaptcha from 'react-google-recaptcha';
import { ServiceInterface } from '../../services/ServiceInterface';

const defaultValue: FormState = {
  type: '',
  name: '',
  email: '',
  request: '',
  attribution: '',
};

interface FormState {
  type: string;
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
  const [selectedService, setSelectedService] =
    React.useState<string>(undefined);
  const [formStep, setFormStep] = useState(0);
  const [formSubmissionMessage, setFormSubmissionMessage] = useState(undefined);

  function readyToNavigateToNextStep() {
    setFormStep(formStep + 1);
  }

  function readyToNavigateToPreviousStep() {
    setFormStep(formStep - 1);
  }

  return (
    <div className='max-w-xl mx-auto bg-white'>
      <form
        // value={value}
        // onChange={(e) => setValue(e.target)}
        onReset={() => setValue(defaultValue)}
        onSubmit={handleSubmit}
        data-netlify='true'
        data-netlify-recaptcha='true'
        name='BasicServiceRequest'
      >
        <div className='visible lg:invisible'>
          <select
            name='type'
            placeholder='Select a Service'
            value={value.type}
            onChange={(e) => {
              setSelectedService(e.currentTarget.value);
              setFullFormVisible(true);
            }}
            // clear={{ label: 'Clear selection' }}
          >
            {props.services.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
          </select>
        </div>
        <div className='invisible lg:visible'>
          <HorizontalSelector
            services={props.services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            setFullFormVisible={setFullFormVisible}
            value={value}
            setValue={setValue}
          ></HorizontalSelector>
        </div>

        <div className='h-12' />

        <div>
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
            submissionMessage={formSubmissionMessage}
          />
        </div>
      </form>
    </div>
  );

  function handleSubmit(event: any) {
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

    fetch('/', options)
      .then(() => {
        showFormSubmissionMessageStep(
          "Thanks for reaching out. I'll be in touch soon."
        );
      })
      .catch(() => {
        showFormSubmissionMessageStep(
          'Unable to submit your inquiry. Sorry for the inconvenience. Please reach out to me directly at davepeachvoice@gmail.com.'
        );
      });
  }

  function showFormSubmissionMessageStep(message: string) {
    setFormSubmissionMessage(message);
    readyToNavigateToNextStep();
  }
}

interface HorizontalSelectorProps {
  services: ServiceInterface[];
  selectedService: string;
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  setFullFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  value: FormState;
  setValue: React.Dispatch<React.SetStateAction<FormState>>;
}

function HorizontalSelector(props: HorizontalSelectorProps) {
  return (
    <div className='flex gap-4 justify-center align-center'>
      {props.services.map((item) => (
        <div
          className={classNames(
            'w-full border border-black align-center justify-center cursor-pointer',
            props.selectedService === item.title ? 'bg-[#eee]' : 'bg-gray'
          )}
          key={item.title}
          onClick={() => {
            if (props.selectedService !== item.title) {
              props.setValue({ ...props.value, type: item.title });
              props.setSelectedService(item.title);
              props.setFullFormVisible(true);
            } else {
              props.setValue({ ...props.value, type: undefined });
              props.setSelectedService(undefined);
              props.setFullFormVisible(false);
            }
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
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
  submissionMessage: string;
}

function RenderFormBody(input: RenderFormBodyInput) {
  return (
    <div style={{ display: input.visible ? undefined : 'none' }}>
      <Step0 {...input} visible={input.formStep === 0}></Step0>
      <Step1 {...input} visible={input.formStep === 1}></Step1>
      <SubmissionMessageStep
        {...input}
        visible={input.formStep === 2}
      ></SubmissionMessageStep>
    </div>
  );
}

interface Step0Props {
  step0Header: string;
  readyToNavigateToNextStep: () => void;
  visible: boolean;
}

function Step0(props: Step0Props) {
  return (
    <div style={{ display: props.visible ? undefined : 'none' }}>
      <StepHeader text={props.step0Header}></StepHeader>
      <FormTextArea></FormTextArea>
      <div className='align-bottom'>
        <FormButton onClick={props.readyToNavigateToNextStep} label='Next' />
      </div>
    </div>
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
  return (
    <div style={{ display: props.visible ? undefined : 'none' }}>
      <StepHeader text={props.step1Header}></StepHeader>
      <label htmlFor='name'>Name</label>
      <input name='email' required></input>
      <label htmlFor='name'>Email</label>
      <input name='email' required></input>
      <label htmlFor='attribution'>Attribution</label>
      <select name='attribution' placeholder='Select'>
        {props.attributionFieldOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <div>
        <Recaptcha
          ref={props.recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          size='normal'
          onChange={() => props.setSubmitButtonEnabled(true)}
        />
      </div>
      <div className='h-5' />
      <div className='flex flex-row justify-between'>
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
      </div>
    </div>
  );
}

interface SubmissionMessageStepProps {
  submissionMessage: string;
  visible: boolean;
}

function SubmissionMessageStep(props: SubmissionMessageStepProps) {
  return (
    <div style={{ display: props.visible ? undefined : 'none' }}>
      {props.submissionMessage}
    </div>
  );
}

interface FormButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  unfilled?: boolean;
}

function FormButton(props: FormButtonProps) {
  return (
    <>
      <label>{props.label}</label>
      <button
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
    </>
  );
}

interface FormTextAreaProps {
  label?: string;
}

function FormTextArea(props: FormTextAreaProps) {
  return (
    <>
      <label>{props.label}</label>
      <textarea
        style={{
          backgroundColor: '#eee',
          color: '#444',
        }}
        color='red'
        name='request'
      ></textarea>
    </>
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
