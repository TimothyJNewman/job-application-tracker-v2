import React, { useEffect, useState } from 'react';
import schema from '../../../constants/template2_schema';
import { PlusLg, XCircleFill } from 'react-bootstrap-icons';
import { toast } from 'react-hot-toast';

const CvSectionBuilderEdit = ({
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
  const [currentSectionJsx, setCurrentSectionJsx] = useState({});

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
      const newFieldValues = currentFieldValuesDatabase
        ? currentFieldValuesDatabase
        : getDefaultFieldValues(currentSchema[currentSection]);
      setCurrentFieldValues({
        [currentSection]: newFieldValues,
        section: currentSection,
        description: '',
      });
      setCurrentDescription(currentDescriptionDatabase);
    }
  }, [currentSchema]);

  useEffect(() => {
    if (
      Object.keys(currentSchema).length !== 0 &&
      Object.keys(currentFieldValues).length !== 0
    ) {
      const newInputJsx = getInputJsx(
        currentSection,
        currentSchema[currentSection]
      );
      setCurrentSectionJsx(newInputJsx);
    }
  }, [currentFieldValues]);

  const inputDefaultValue = {
    unavailable: null,
    shortText: '',
    longText: '',
    number: 0,
    date: '',
  };

  const getInputFieldJsx = ({ inputType, inputName, breadCrumbs }) => {
    let inputState;
    if (breadCrumbs) {
      let currentFieldValuesSub = currentFieldValues;
      for (let i = 0; i < breadCrumbs.length; i++) {
        if (i === breadCrumbs.length - 1) {
          inputState = currentFieldValuesSub[breadCrumbs[i]];
        } else {
          currentFieldValuesSub = currentFieldValuesSub[breadCrumbs[i]];
        }
      }
    }

    const inputFieldJsxDictionary = {
      // unavailable: ({ inputName }) => (
      //   <>
      //     {inputName}
      //     <span>Not available</span>
      //   </>
      // ),
      unavailable: () => null,
      objectLabel: ({ inputName }) => (
        <h2 key={inputName} className='mb-2 font-medium'>
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
      shortText: ({ inputName, inputState, breadCrumbs }) => (
        <div key={inputName} className='mb-4'>
          <label
            value={inputName}
            htmlFor={inputName}
            className='form-label mb-2 inline-block text-gray-700'>
            {inputName}
          </label>
          <input
            type='text'
            className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Text input'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </div>
      ),
      longText: ({ inputName, inputState, breadCrumbs }) => (
        <div key={inputName} className='mb-4'>
          <label
            htmlFor={inputName}
            className='form-label mb-2 inline-block text-gray-700'>
            {inputName}
          </label>
          <textarea
            className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
            rows='3'
            placeholder='Your message'></textarea>
        </div>
      ),
      number: ({ inputName, inputState, breadCrumbs }) => (
        <div key={inputName} className='mb-4'>
          <label
            value={inputName}
            htmlFor={inputName}
            className='form-label mb-2 inline-block text-gray-700'>
            {inputName}
          </label>
          <input
            type='number'
            className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
            placeholder='Number input'
          />
        </div>
      ),
      date: ({ inputName, inputState, breadCrumbs }) => (
        <div key={inputName} className='mb-4'>
          <label
            value={inputName}
            htmlFor={inputName}
            className='form-label mb-2 inline-block text-gray-700'>
            {inputName}
          </label>
          <input
            type='date'
            className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Text input'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </div>
      ),
    };
    return inputFieldJsxDictionary[inputType]({
      inputName,
      inputState,
      breadCrumbs,
    });
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

  // gets input jsx given a schema
  const getInputJsx = (schemaKey, schemaValue) => {
    const getInputJsxRecursive = (schemaKey, schemaValue, breadCrumbs) => {
      let returnVal;
      if (schemaValue.constructor === String) {
        returnVal = getInputFieldJsx({
          inputType: schemaValue,
          inputName: schemaKey,
          breadCrumbs,
        });
      } else if (schemaValue.constructor === Array) {
        returnVal = [];
        returnVal.push(
          getInputFieldJsx({ inputType: 'objectLabel', inputName: schemaKey })
        );
        let currentFieldValuesArray;
        let currentFieldValuesSub = currentFieldValues;
        for (let i = 0; i < breadCrumbs.length; i++) {
          if (i === breadCrumbs.length - 1) {
            currentFieldValuesArray = currentFieldValuesSub[breadCrumbs[i]];
          } else {
            currentFieldValuesSub = currentFieldValuesSub[breadCrumbs[i]];
          }
        }
        returnVal.push(
          <ol className='list-outside list-decimal pl-4'>
            {currentFieldValuesArray.map((elem, index) => {
              return (
                <li key={index}>
                  {getInputJsxRecursive('', schemaValue[0], [
                    ...breadCrumbs,
                    index,
                  ])}
                </li>
              );
            })}
          </ol>
        );
        returnVal.push(
          getInputFieldJsx({
            inputType: 'newFieldButton',
            inputName: schemaKey,
            breadCrumbs,
          })
        );
      } else if (schemaValue.constructor === Object) {
        returnVal = [];
        returnVal.push(
          getInputFieldJsx({ inputType: 'objectLabel', inputName: schemaKey })
        );
        returnVal.push(
          <div className='pl-4'>
            {Object.entries(schemaValue).map(([subSchemaKey, subSchemaValue]) =>
              getInputJsxRecursive(subSchemaKey, subSchemaValue, [
                ...breadCrumbs,
                subSchemaKey,
              ])
            )}
          </div>
        );
      }
      return returnVal;
    };
    const newSchemaValue = getInputJsxRecursive(schemaKey, schemaValue, [
      schemaKey,
    ]);
    return { [schemaKey]: newSchemaValue };
  };

  const getDefaultArraySchema = (schema, breadCrumbs) => {
    if (breadCrumbs.length > 3 || breadCrumbs.length <= 0) {
      throw new Error(
        'Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs
      );
    }

    let schemaSub = schema;
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (i === breadCrumbs.length - 1) {
        return schemaSub[breadCrumbs[i]][0];
      } else {
        schemaSub = schemaSub[breadCrumbs[i]];
      }
    }
  };

  /**
   * adds or deletes input fields for array inputs
   * if deleteIndex is null, add of not delete
   */
  const modifyInputFields = (
    schema,
    fieldValues,
    breadCrumbs,
    deleteIndex = null
  ) => {
    if (breadCrumbs.length > 3 || breadCrumbs.length <= 0) {
      throw new Error(
        'Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs
      );
    }

    let newSchema = { ...schema };
    let newFieldValues = { ...fieldValues };
    let schemaSub = schema;
    let fieldValuesSub = fieldValues;
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (i === breadCrumbs.length - 1) {
        if (deleteIndex) {
          schemaSub[breadCrumbs[i]] = schemaSub[breadCrumbs[i]].filter(
            (elem, i) => i !== deleteIndex
          );
          fieldValuesSub[breadCrumbs[i]] = fieldValuesSub[
            breadCrumbs[i]
          ].filter((elem, i) => i !== deleteIndex);
        } else {
          schemaSub[breadCrumbs[i]] = [
            ...schemaSub[breadCrumbs[i]],
            getDefaultArraySchema(currentSchema, breadCrumbs),
          ];
          fieldValuesSub[breadCrumbs[i]] = [
            ...fieldValuesSub[breadCrumbs[i]],
            getDefaultFieldValues(
              getDefaultArraySchema(currentSchema, breadCrumbs)
            ),
          ];
        }
      } else {
        schemaSub = schemaSub[breadCrumbs[i]];
        fieldValuesSub = fieldValuesSub[breadCrumbs[i]];
      }
    }

    setCurrentSchema(newSchema);
    setCurrentFieldValues(newFieldValues);
  };

  const addFieldHandler = (event, breadCrumbs) => {
    modifyInputFields(currentSchema, currentFieldValues, breadCrumbs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Successfully saved');
    editSectionCallback(currentFieldValues, currentDescription, id);
  };

  const handleInputChange = (event, fieldValues, breadCrumbs) => {
    if (breadCrumbs.length > 4 || breadCrumbs.length <= 0) {
      throw new Error(
        'Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs
      );
    }

    let newFieldValues = { ...fieldValues };
    let fieldValuesSub = newFieldValues;
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (i === breadCrumbs.length - 1) {
        fieldValuesSub[breadCrumbs[i]] = event.target.value;
      } else {
        fieldValuesSub = fieldValuesSub[breadCrumbs[i]];
      }
    }

    setCurrentFieldValues(newFieldValues);
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
              {currentSectionJsx[currentSection] && (
                <>
                  <label
                    htmlFor='description'
                    className='form-label mb-2 inline-block text-gray-700'>
                    Description
                  </label>
                  <input
                    type='text'
                    className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                    placeholder='Text input'
                    name='description'
                    id='description'
                    value={currentDescription}
                    onChange={(event) =>
                      setCurrentDescription(event.target.value)
                    }
                  />
                </>
              )}
            </div>
            {currentSectionJsx[currentSection]}
          </form>
        </div>
      </div>
    </>
  );
};

export default CvSectionBuilderEdit;
