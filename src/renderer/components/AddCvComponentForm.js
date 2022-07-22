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
          onChange={(e) => {
            setSection((arr) => ({ ...arr, summary: e.target.value }));
          }}
        />
      </form>
      <form
        className={`form ${props.className}`}
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmitCallback(appInput);
          setAppInput(defaultState);
        }}>
        <label htmlFor='summary'>Summary:</label>
        <br />
        <input
          value={appInput.summary}
          onChange={(e) => {
            setAppInput((arr) => ({ ...arr, summary: e.target.value }));
          }}
          type='text'
          name='summary'
        />
        <br />
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
    </>
  );
}
