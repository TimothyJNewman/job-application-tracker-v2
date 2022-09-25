import React, { useEffect, useState, useRef, Fragment } from 'react';
import useClickOutside from '../../../util/useClickOutside';
import schema from '../../../constants/template2_schema';

const CvSectionBuilder = ({ addSectionCallback, onClickOutside }) => {
  const [currentSection, setCurrentSection] = useState('basics');
  const [currentSchema, setCurrentSchema] = useState({});
  const [currentFieldValues, setCurrentFieldValues] = useState({});
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentSectionJsx, setCurrentSectionJsx] = useState({});

  const clickRef = useRef();
  useClickOutside(clickRef, 'overlay-blur', onClickOutside);

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
      const newFieldValues = getDefaultFieldValues(
        currentSchema[currentSection]
      );
      setCurrentFieldValues({
        [currentSection]: newFieldValues,
        section: currentSection,
        description: '',
      });
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
      // unavailable: ({ inputName }) => <Fragment key={inputName}>{inputName}<span>Not available</span></Fragment>,
      unavailable: () => null,
      objectLabel: ({ inputName }) => (
        <Fragment key={inputName}>
          <p>{inputName}</p>
          <br />
        </Fragment>
      ),
      newFieldButton: ({ inputName, breadCrumbs }) => (
        <Fragment key={`add-button-${inputName}`}>
          <br />
          <button
            onClick={(event) => addFieldHandler(event, breadCrumbs)}
            className='std-button'
            type='button'>
            {`Add ${inputName}`}
          </button>
        </Fragment>
      ),
      shortText: ({ inputName, inputState, breadCrumbs }) => (
        <Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='my-2 py-1 italic'>
            {inputName}
          </label>
          <input
            type='text'
            className='my-1 mr-8 border-4 p-1 px-2 outline-none focus:border-purple-700'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </Fragment>
      ),
      longText: ({ inputName, inputState, breadCrumbs }) => (
        <Fragment key={inputName}>
          <label htmlFor={inputName} className='my-2 py-1 italic'>
            {inputName}
          </label>
          <textarea
            className='my-1 mr-8 border-4 p-1 px-2 outline-none focus:border-purple-700'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </Fragment>
      ),
      number: ({ inputName, inputState, breadCrumbs }) => (
        <Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='my-2 py-1 italic'>
            {inputName}
          </label>
          <input
            className='my-1 mr-8 border-4 p-1 px-2 outline-none focus:border-purple-700'
            type='number'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </Fragment>
      ),
      date: ({ inputName, inputState, breadCrumbs }) => (
        <Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='my-2 py-1 italic'>
            {inputName}
          </label>
          <div className='mr-6'>
            <input
              className='my-1 mr-2 border-4 p-1 px-2 outline-none focus:border-purple-700'
              type='date'
              name={inputName}
              id={inputName}
              value={inputState}
              onChange={(event) =>
                handleInputChange(event, currentFieldValues, breadCrumbs)
              }
            />
          </div>
        </Fragment>
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
        returnVal.push(
          ...schemaValue.map((subSchemaValue, index) =>
            getInputJsxRecursive(`${schemaKey}-${index}`, subSchemaValue, [
              ...breadCrumbs,
              index,
            ])
          )
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
          ...Object.entries(schemaValue).map(([subSchemaKey, subSchemaValue]) =>
            getInputJsxRecursive(subSchemaKey, subSchemaValue, [
              ...breadCrumbs,
              subSchemaKey,
            ])
          )
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

  // adds or deletes input fields for array inputs
  // if deleteIndex is null, add of not delete
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
    addSectionCallback(currentFieldValues, currentDescription);
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
    <div className='fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-md backdrop-brightness-75'>
      <div id='overlay-blur' className='fixed  h-screen w-screen'></div>
      <div
        ref={clickRef}
        className='m-8 flex w-full items-center justify-center'>
        <div className='relative z-30 max-w-3xl grow bg-white p-4'>
          <h1 id='cv-section-builder' className='text-xl font-bold'>
            {currentSection} section builder
          </h1>
          <ul className='mb-2 flex flex-wrap gap-2'>
            {Object.entries(schema)
              .filter(([key, value]) => value !== 'unavailable')
              .map(([key, value]) => (
                <li
                  key={key}
                  onClick={() => setCurrentSection(key)}
                  className='underline hover:cursor-pointer hover:underline-offset-4'>
                  {key}
                </li>
              ))}
          </ul>
          <form className='relative grid max-h-[70vh] grid-cols-2 gap-4 overflow-y-auto'>
            {currentSectionJsx[currentSection] && (
              <>
                <label htmlFor='description' className='bold my-2 py-1'>
                  Description
                </label>
                <input
                  className='my-1 mr-8 border-4 p-1 px-2 outline-none focus:border-purple-700'
                  type='text'
                  name='description'
                  value={currentDescription}
                  onChange={(event) =>
                    setCurrentDescription(event.target.value)
                  }
                />
              </>
            )}
            {currentSectionJsx[currentSection]}
            <br />
            <input
              type='submit'
              onClick={handleSubmit}
              className='std-button my-2 ml-auto block'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CvSectionBuilder;
