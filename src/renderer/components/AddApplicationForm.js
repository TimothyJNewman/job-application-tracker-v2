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
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmitCallback(appInput);
        setAppInput(defaultState);
      }}>
      <label htmlFor='company'>Company:</label>
      <br />
      <input
        value={appInput.company}
        onChange={(e) => {
          setAppInput((arr) => ({ ...arr, company: e.target.value }));
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
        onChange={(e) => {
          setAppInput((arr) => ({ ...arr, role: e.target.value }));
        }}
        type='text'
        name='role'
      />
      <br />
      <label htmlFor='job_description'>Job Description</label>
      <br />
      <input
        value={appInput.job_description}
        onChange={(e) => {
          setAppInput((arr) => ({ ...arr, job_description: e.target.value }));
        }}
        type='text'
        name='job_description'
      />
      <br />
      <label htmlFor='status'>Status:</label>
      <br />
      <select
        value={appInput.status}
        onChange={(e) => {
          setAppInput((arr) => ({ ...arr, status: e.target.value }));
        }}
        name='status'>
        <option value='To Apply'>To Apply</option>
        <option value='Applied'>Applied</option>
        <option value='Rejected'>Rejected</option>
      </select>
      <div className='block ml-auto max-w-fit'>
        <input
          value='Cancel'
          type='button'
          onClick={props.handleCancelCallback}
          className='inline mr-2 std-button'
        />
        <input value='Submit' type='submit' className='inline std-button' />
      </div>
    </form>
  );
}
