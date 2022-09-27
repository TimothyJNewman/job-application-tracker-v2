import React from 'react';

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
              Delete confirmation
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
            <button
              type='button'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'
              data-bs-dismiss='modal'
              onClick={(event) => {
                event.preventDefault();
                handleSubmitCallback();
              }}
              className='ml-1 rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
