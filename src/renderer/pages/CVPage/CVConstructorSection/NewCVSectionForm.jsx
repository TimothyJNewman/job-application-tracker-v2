import React, { useEffect, useState } from 'react';
import schema from '../../../constants/template2_schema';
import { PlusLg } from 'react-bootstrap-icons';
import { Button } from '../../../components/microComponents';
import FormElements from './FormElements';

const NewCVSectionForm = ({ addSectionCallback, currentSection }) => {
  const [currentSchema, setCurrentSchema] = useState({});
  const [currentFieldValues, setCurrentFieldValues] = useState({});
  const [currentDescription, setCurrentDescription] = useState('');

  useEffect(() => {
    let newSchemaValue = schema[currentSection];
    if (schema[currentSection].constructor === Array) {
      newSchemaValue = { ...schema[currentSection][0] };
    } else if (schema[currentSection].constructor === Object) {
      newSchemaValue = { ...schema[currentSection] };
    }
    setCurrentSchema({ [currentSection]: newSchemaValue });
    setCurrentFieldValues({});
  }, [currentSection]);

  const inputDefaultValue = {
    unavailable: null,
    shortText: '',
    longText: '',
    number: 0,
    date: '',
  };

  const getDefaultFieldValues = (schemaValue) => {
    let returnVal;
    if (schemaValue.constructor === String) {
      returnVal = inputDefaultValue[schemaValue];
    } else if (schemaValue.constructor === Array) {
      returnVal = schemaValue.map((subSchemaValue) =>
        getDefaultFieldValues(subSchemaValue)
      );
    } else if (schemaValue.constructor === Object) {
      returnVal = {};
      Object.entries(schemaValue).forEach(([subSchemaKey, subSchemaValue]) => {
        returnVal[subSchemaKey] = getDefaultFieldValues(subSchemaValue);
      });
    }
    return returnVal;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSectionCallback(currentFieldValues, currentDescription);
    // reset values to default
    setCurrentFieldValues({
      [currentSection]: getDefaultFieldValues(currentSchema[currentSection]),
      section: currentSection,
      description: '',
    });
    setCurrentDescription('');
  };

  return (
    <div
      className='fade modal fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm'
      id='newCVSectionModal'
      tabIndex='-1'
      aria-labelledby='newCVSectionModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-dialog-scrollable pointer-events-none relative w-auto'>
        <div className='modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none'>
          <div className='modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4'>
            <h2
              className='text-xl font-medium capitalize leading-normal text-gray-800'
              id='newCVSectionModalLabel'>
              {currentSection} <span className='text-sm'>section builder</span>
            </h2>
            <button
              type='button'
              className='btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body px-4 py-2'>
            <form className='relative'>
              <div className='mb-2 border-b border-gray-200 pb-2'>
                <label
                  htmlFor='description'
                  className='form-label mb-2 inline-block font-medium text-gray-700'>
                  Description
                </label>
                <input
                  type='text'
                  className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                  placeholder='Text input'
                  title='Description'
                  name='description'
                  id='description'
                  value={currentDescription}
                  onChange={(event) =>
                    setCurrentDescription(event.target.value)
                  }
                />
              </div>
              <FormElements
                currentSection={currentSection}
                currentSchema={currentSchema}
                setCurrentSchema={setCurrentSchema}
                currentFieldValues={currentFieldValues}
                setCurrentFieldValues={setCurrentFieldValues}
              />
            </form>
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
                onClick={handleSubmit}
                value='Submit'
                color='blue'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCVSectionForm;
