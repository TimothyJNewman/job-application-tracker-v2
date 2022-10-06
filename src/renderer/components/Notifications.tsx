import React from 'react';
import { XLg } from 'react-bootstrap-icons';
import { toast, ToastOptions } from 'react-hot-toast';

const genericSuccessNotification = (message: string, options: ToastOptions) => {
  return toast.success(
    (t) => (
      <div className='flex items-center'>
        {message}
        <button
          onClick={() => toast.dismiss(t.id)}
          className='ml-2 flex h-8 w-8 items-center justify-center text-red-500 hover:bg-gray-200'>
          <XLg />
        </button>
      </div>
    ),
    options
  );
};

const genericErrorNotification = (message: string, options: ToastOptions) => {
  return toast.error(
    (t) => (
      <div className='flex items-center'>
        {message}
        <button
          onClick={() => toast.dismiss(t.id)}
          className='ml-2 flex h-8 w-8 items-center justify-center text-red-500 hover:bg-gray-200'>
          <XLg />
        </button>
      </div>
    ),
    options
  );
};

const dismissNotification = (id: string) => toast.dismiss(id);

const removeNotification = (id: string) => toast.remove(id);

export {
  genericSuccessNotification,
  genericErrorNotification,
  dismissNotification,
  removeNotification,
};
