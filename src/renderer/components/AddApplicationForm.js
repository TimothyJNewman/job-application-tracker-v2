import React, { useState } from 'react';

const defaultState = {
  company: '',
  role: '',
  job_description: '',
  status: 'To Apply',
};

export default function AddApplicationForm(props) {
  const [appInput, setAppInput] = useState(defaultState);
  return (
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
        autoFocus
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
  );
}
