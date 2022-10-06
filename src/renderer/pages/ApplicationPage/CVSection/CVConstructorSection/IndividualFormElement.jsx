import React from 'react';
import { PlusLg } from 'react-bootstrap-icons';

const IndividualFormElement = ({
  inputType,
  inputName,
  breadCrumbs,
  addFieldHandler,
  getInputValue,
  handleInputChange,
}) => {
  const inputFieldJsxDictionary = {
    // unavailable: ({ inputName }) => (
    //   <>
    //     {inputName}
    //     <span>Not available</span>
    //   </>
    // ),
    unavailable: () => null,
    objectLabel: ({ inputName }) => (
      <h2 key={inputName} className='mb-2 font-medium capitalize'>
        {inputName}
      </h2>
    ),
    newFieldButton: ({ inputName, breadCrumbs }) => (
      <div key={`add-button-${inputName}`} className='py-2'>
        <button
          onClick={(event) => addFieldHandler(event, breadCrumbs)}
          type='button'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='align-center my-2 ml-auto flex rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
          <PlusLg className='mr-2 h-4 w-4' />
          {`Add ${inputName}`}
        </button>
      </div>
    ),
    shortText: ({ inputName, breadCrumbs }) => (
      <div key={inputName} className='mb-4'>
        <label
          htmlFor={inputName}
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Text input'
          title={inputName}
          name={inputName}
          id={inputName}
          value={getInputValue(breadCrumbs)}
          onChange={(event) => handleInputChange(event, breadCrumbs)}
        />
      </div>
    ),
    longText: ({ inputName, breadCrumbs }) => (
      <div key={inputName} className='mb-4'>
        <label
          htmlFor={inputName}
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <textarea
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          title={inputName}
          name={inputName}
          id={inputName}
          value={getInputValue(breadCrumbs)}
          onChange={(event) => handleInputChange(event, breadCrumbs)}
          rows='3'
          placeholder='Your message'></textarea>
      </div>
    ),
    number: ({ inputName, breadCrumbs }) => (
      <div key={inputName} className='mb-4'>
        <label
          htmlFor={inputName}
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input
          type='number'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          title={inputName}
          name={inputName}
          id={inputName}
          value={getInputValue(breadCrumbs)}
          onChange={(event) => handleInputChange(event, breadCrumbs)}
          placeholder='Number input'
        />
      </div>
    ),
    date: ({ inputName, breadCrumbs }) => (
      <div key={inputName} className='mb-4'>
        <label
          htmlFor={inputName}
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input
          type='date'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Text input'
          title={inputName}
          name={inputName}
          id={inputName}
          value={getInputValue(breadCrumbs)}
          onChange={(event) => handleInputChange(event, breadCrumbs)}
        />
      </div>
    ),
  };
  return inputFieldJsxDictionary[inputType]({
    inputName,
    breadCrumbs,
  });
};

export default IndividualFormElement;
