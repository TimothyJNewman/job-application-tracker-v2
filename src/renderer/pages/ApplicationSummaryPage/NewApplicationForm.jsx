import React, { useState } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Button } from '../../components/microComponents';

const defaultState = {
  company: '',
  role: '',
  job_description: '',
  link: '',
  status: 'To apply',
  priority: 'medium',
  location:"",
  deadline: ""
};

const NewApplicationForm = ({ handleSubmitCallback }) => {
  const [appInput, setAppInput] = useState(defaultState);
  return (
    <div
      className='fade modal fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm'
      id='addNewModal'
      tabIndex='-1'
      aria-labelledby='addNewModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog pointer-events-none relative w-auto'>
        <div className='modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none'>
          <div className='modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4'>
            <h2
              className='text-xl font-medium leading-normal text-gray-800'
              id='addNewModalLabel'>
              <PlusCircleFill className='mb-1 inline text-green-500' /> New
              Application
            </h2>
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
                className='form-label mb-2 inline-block font-medium text-gray-700'>
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
                className='form-label mb-2 inline-block font-medium text-gray-700'>
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
                htmlFor='deadline'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                Deadline
              </label>
              <input
                type='date'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='deadline'
                id='deadline'
                value={appInput.deadline}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    deadline: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label
                htmlFor='link'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                Link
              </label>
              <input
                type='text'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='link'
                id='link'
                value={appInput.link}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    link: event.target.value,
                  }));
                }}
                placeholder='www.myawesomewebite.com'
              />
            </div>
            <div>
              <label
                htmlFor='location'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                Location
              </label>
              <textarea
                type='text'
                className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                name='location'
                id='location'
                value={appInput.location}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    location: event.target.value,
                  }));
                }}
                placeholder='1600 Pennsylvania Ave., NW Washington, DC 20500'
              />
            </div>
            <div>
              <label
                htmlFor='job_description'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                [Optional] Job Description
              </label>
              <textarea
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
              <label
                htmlFor='status'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                Status:
              </label>
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
                aria-label='Default select status'>
                {/* <option selected>Open this select menu</option> */}
                <option value='To apply'>To apply</option>
                <option value='Applied'>Applied</option>
                <option value='Assessment'>Assessment</option>
                <option value='Interview'>Interview</option>
                <option value='Waiting for result'>Waiting for result</option>
                <option value='Rejected'>Rejected</option>
                <option value='Offer'>Offer</option>
              </select>
            </div>
            <div>
              <label
                htmlFor='priority'
                className='form-label mb-2 inline-block font-medium text-gray-700'>
                Priority:
              </label>
              <select
                value={appInput.priority}
                onChange={(event) => {
                  setAppInput((arr) => ({
                    ...arr,
                    priority: event.target.value,
                  }));
                }}
                name='priority'
                className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                aria-label='Default select priority'>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
          </div>
          <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4'>
            <div className='flex items-center gap-x-2'>
              <Button
                additionalAttributes={{ 'data-bs-dismiss': 'modal' }}
                value='Cancel'
                color='purple'
              />
              <Button
                additionalAttributes={{ 'data-bs-dismiss': 'modal' }}
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmitCallback(appInput);
                  setAppInput(defaultState);
                }}
                value='Save changes'
                color='blue'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewApplicationForm;
