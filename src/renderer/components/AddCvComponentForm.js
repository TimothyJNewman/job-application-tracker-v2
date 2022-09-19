import React, { useState } from 'react';

const defaultState = {
  company: '',
  role: '',
  job_description: '',
  status: 'To Apply',
};

export default function AddCvComponentForm(props) {
  const [Section, setSection] = useState('');
  const [appInput, setAppInput] = useState(defaultState);
  return (
    <>
      <form>
        <label htmlFor='summaryRadio'>Summary</label>
        <input
          value={Section.summary}
          onChange={(event) => {
            setSection((arr) => ({ ...arr, summary: event.target.value }));
          }}
        />
      </form>
      <form
        className={`form ${props.className}`}
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSubmitCallback(appInput);
          setAppInput(defaultState);
        }}>
        <label htmlFor='summary'>Summary:</label>
        <br />
        <input
          value={appInput.summary}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, summary: event.target.value }));
          }}
          type='text'
          name='summary'
        />
        <br />
        <div className='ml-auto block max-w-fit'>
          <input
            value='Cancel'
            type='button'
            onClick={props.handleCancelCallback}
            className='std-button mr-2 inline'
          />
          <input value='Submit' type='submit' className='std-button inline' />
        </div>
      </form>
      <form
        className={`form ${props.className}`}
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSubmitCallback(appInput);
          setAppInput(defaultState);
        }}>
        <label htmlFor='company'>Company:</label>
        <br />
        <input
          value={appInput.company}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, company: event.target.value }));
          }}
          type='text'
          name='company'
        />
        <br />
        <label htmlFor='role'>Role:</label>
        <br />
        <input
          value={appInput.role}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, role: event.target.value }));
          }}
          type='text'
          name='role'
        />
        <br />
        <div className='ml-auto block max-w-fit'>
          <input
            value='Cancel'
            type='button'
            onClick={props.handleCancelCallback}
            className='std-button mr-2 inline'
          />
          <input value='Submit' type='submit' className='std-button inline' />
        </div>
      </form>
      <form
        className={`form ${props.className}`}
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSubmitCallback(appInput);
          setAppInput(defaultState);
        }}>
        <label htmlFor='company'>Company:</label>
        <br />
        <input
          value={appInput.company}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, company: event.target.value }));
          }}
          type='text'
          name='company'
        />
        <br />
        <label htmlFor='role'>Role:</label>
        <br />
        <input
          value={appInput.role}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, role: event.target.value }));
          }}
          type='text'
          name='role'
        />
        <br />
        <label htmlFor='job_description'>Job Description</label>
        <br />
        <input
          value={appInput.job_description}
          onChange={(event) => {
            setAppInput((arr) => ({
              ...arr,
              job_description: event.target.value,
            }));
          }}
          type='text'
          name='job_description'
        />
        <br />
        <label htmlFor='status'>Status:</label>
        <br />
        <select
          value={appInput.status}
          onChange={(event) => {
            setAppInput((arr) => ({ ...arr, status: event.target.value }));
          }}
          name='status'>
          <option value='To Apply'>To Apply</option>
          <option value='Applied'>Applied</option>
          <option value='Rejected'>Rejected</option>
        </select>
        <div className='ml-auto block max-w-fit'>
          <input
            value='Cancel'
            type='button'
            onClick={props.handleCancelCallback}
            className='std-button mr-2 inline'
          />
          <input value='Submit' type='submit' className='std-button inline' />
        </div>
      </form>
    </>
  );
}
