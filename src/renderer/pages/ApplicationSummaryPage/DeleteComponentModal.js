import React from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import { Button } from '../../components/microComponents';

export default function DeleteApplicationModal({
  handleSubmitCallback,
  deleteApplicationName,
}) {
  return (
    <div
      className='fade modal fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm'
      id='deleteModal'
      tabIndex='-1'
      aria-labelledby='deleteModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog pointer-events-none relative w-auto'>
        <div className='modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none'>
          <div className='modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4'>
            <h2
              className='text-xl font-medium leading-normal text-gray-800'
              id='deleteModalLabel'>
             <XCircleFill className='inline mb-1 text-red-500'/> Delete confirmation
            </h2>
            <button
              type='button'
              className='btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body relative p-4'>
            Are you sure you want to delete {deleteApplicationName}?
          </div>
          <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4'>
            <div className='flex'>
              <Button
                value='Delete'
                color='blue'
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmitCallback();
                }}
                additionalAttributes={{ 'data-bs-dismiss': 'modal' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
