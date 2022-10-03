import React, { useEffect, useState } from 'react';
import schema from '../../../../constants/template2_schema';
import { XCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-hot-toast';
import FormElements from './FormElements';

const EditCVSectionForm = ({
  elementToggleClickHandler,
  editSectionCallback,
  id,
  currentSection,
  currentFieldValuesDatabase,
  currentDescriptionDatabase,
}) => {
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

  useEffect(() => {
    if (
      Object.keys(currentSchema).length !== 0 &&
      Object.keys(currentFieldValues).length === 0
    ) {
      setCurrentFieldValues({
        [currentSection]: currentFieldValuesDatabase,
        section: currentSection,
        description: '',
      });
      setCurrentDescription(currentDescriptionDatabase);
    }
  }, [currentSchema]);

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Successfully saved');
    editSectionCallback(currentFieldValues, currentDescription, id);
  };

  return (
    <>
      <div className='group relative z-20 flex items-center px-4 py-2 shadow-md'>
        <div className='ease h-5 w-1 bg-red-600 opacity-80 duration-500 group-hover:h-0 group-hover:w-0 group-hover:opacity-0'></div>
        <button
          aria-label='Delete section'
          onClick={() => elementToggleClickHandler('used', id)}
          className='ease mr-2 flex w-0 items-center justify-center opacity-20 transition transition-[width] duration-500 group-hover:w-6 group-hover:opacity-100 '>
          <XCircleFill className='h-5 w-5 text-red-600' />
        </button>
        <h1
          id='cv-section-builder'
          className='grow text-xl font-bold capitalize'>
          {currentSection} section builder
        </h1>
        <button
          type='submit'
          onClick={handleSubmit}
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='ml-auto block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
          Save
        </button>
      </div>
      <div className='flex w-full items-center justify-center'>
        <div className='grow overflow-y-scroll bg-white p-4'>
          <form className='relative max-h-[70vh]'>
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
      </div>
    </>
  );
};

export default EditCVSectionForm;
