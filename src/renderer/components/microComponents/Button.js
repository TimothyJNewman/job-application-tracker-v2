import React from 'react';

const Button = ({
  Icon,
  color = 'blue',
  additionalAttributes = {},
  value,
  onClick,
}) => (
  <button
    type='button'
    onClick={onClick}
    data-mdb-ripple='true'
    data-mdb-ripple-color='light'
    {...additionalAttributes}
    className={`align-center ml-auto flex rounded bg-${color}-600 px-4 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-${color}-700 hover:shadow-lg focus:bg-${color}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${color}-800 active:shadow-lg`}>
    {Icon && <Icon className='mr-2 h-4 w-4' />}
    {value}
  </button>
);

export default Button;
