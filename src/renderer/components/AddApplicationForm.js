import React, { useState } from 'react';

const defaultState = {
  company: '',
  role: '',
  job_description: '',
  status: 'To Apply',
};

export default function AddApplicationForm({ handleSubmitCallback }) {
  const [appInput, setAppInput] = useState(defaultState);
  return (
    <div
      className='modal fade fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm'
      id='addNewModal'
      tabIndex='-1'
      aria-labelledby='addNewModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog pointer-events-none relative w-auto'>
        <div className='modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none'>
          <div className='modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4'>
            <h5
              className='text-xl font-medium leading-normal text-gray-800'
              id='addNewModalLabel'>
              Modal title
            </h5>
            <button
              type='button'
              className='btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body relative flex flex-col gap-y-4 p-4'>
            <div>
              <label
                htmlFor='company'
                className='form-label mb-2 inline-block text-gray-700'>
                Company
              </label>
              <input
                type='text'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='company'
                id='company'
                value={appInput.company}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    company: event.target.value,
                  }));
                }}
                placeholder='Bridgewater finance LLC'
              />
            </div>
            <div>
              <label
                htmlFor='role'
                className='form-label mb-2 inline-block text-gray-700'>
                Role
              </label>
              <input
                type='text'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='role'
                id='role'
                value={appInput.role}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    role: event.target.value,
                  }));
                }}
                placeholder='Marketing intern'
              />
            </div>
            <div>
              <label
                htmlFor='job_description'
                className='form-label mb-2 inline-block text-gray-700'>
                Job Description
              </label>
              <input
                type='text'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='job_description'
                id='job_description'
                value={appInput.job_description}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    job_description: event.target.value,
                  }));
                }}
                placeholder='Market bar soap to customers'
              />
            </div>
            <div>
              <label htmlFor='status'>Status:</label>
              <select
                value={appInput.status}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    status: event.target.value,
                  }));
                }}
                name='status'
                className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                aria-label='Default select example'>
                {/* <option selected>Open this select menu</option> */}
                <option value='To Apply'>To Apply</option>
                <option value='Applied'>Applied</option>
                <option value='Rejected'>Rejected</option>
              </select>
            </div>
          </div>
          <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4'>
            <button
              type='button'
              className='rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg'
              data-bs-dismiss='modal'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'>
              Close
            </button>
            <button
              type='button'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'
              onClick={(event) => {
                event.preventDefault();
                handleSubmitCallback(appInput);
                setAppInput(defaultState);
              }}
              className='ml-1 rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
