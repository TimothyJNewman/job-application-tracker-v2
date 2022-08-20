import React, { useEffect, useState, useRef } from 'react';
import useClickOutside from '../../util/useClickOutside';
import schema from '../../constants/template2_schema';

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
      // unavailable: ({ inputName }) => <React.Fragment key={inputName}>{inputName}<span>Not available</span></React.Fragment>,
      unavailable: () => null,
      objectLabel: ({ inputName }) => (
        <React.Fragment key={inputName}>
          <p>{inputName}</p>
          <br />
        </React.Fragment>
      ),
      newFieldButton: ({ inputName, breadCrumbs }) => (
        <React.Fragment key={`add-button-${inputName}`}>
          <br />
          <button
            onClick={(event) => addFieldHandler(event, breadCrumbs)}
            className='std-button'
            type='button'>
            {`Add ${inputName}`}
          </button>
        </React.Fragment>
      ),
      shortText: ({ inputName, inputState, breadCrumbs }) => (
        <React.Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='italic my-2 py-1'>
            {inputName}
          </label>
          <input
            type='text'
            className='border-4 focus:border-purple-700 my-1 mr-8 p-1 px-2 outline-none'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </React.Fragment>
      ),
      longText: ({ inputName, inputState, breadCrumbs }) => (
        <React.Fragment key={inputName}>
          <label htmlFor={inputName} className='italic my-2 py-1'>
            {inputName}
          </label>
          <textarea
            className='border-4 focus:border-purple-700 my-1 mr-8 p-1 px-2 outline-none'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }></textarea>
        </React.Fragment>
      ),
      number: ({ inputName, inputState, breadCrumbs }) => (
        <React.Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='italic my-2 py-1'>
            {inputName}
          </label>
          <input
            className='border-4 focus:border-purple-700 my-1 mr-8 p-1 px-2 outline-none'
            type='number'
            name={inputName}
            id={inputName}
            value={inputState}
            onChange={(event) =>
              handleInputChange(event, currentFieldValues, breadCrumbs)
            }
          />
        </React.Fragment>
      ),
      date: ({ inputName, inputState, breadCrumbs }) => (
        <React.Fragment key={inputName}>
          <label
            value={inputName}
            htmlFor={inputName}
            className='italic my-2 py-1'>
            {inputName}
          </label>
          <div className='mr-6'>
            <input
              className='border-4 focus:border-purple-700 my-1 mr-2 p-1 px-2 outline-none'
              type='date'
              name={inputName}
              id={inputName}
              value={inputState}
              onChange={(event) =>
                handleInputChange(event, currentFieldValues, breadCrumbs)
              }
            />
          </div>
        </React.Fragment>
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
    <div className='flex fixed h-screen w-screen items-center justify-center top-0 left-0 backdrop-blur-md backdrop-brightness-75'>
      <div id='overlay-blur' className='fixed h-screen w-screen z-10'></div>
      <div
        ref={clickRef}
        className='m-8 w-full flex items-center justify-center'>
        <div className='bg-white p-4 grow max-w-3xl z-20'>
          <h1 id='cv-section-builder' className='font-bold text-xl'>
            {currentSection} section builder
          </h1>
          <ul className='flex flex-wrap gap-2 mb-2'>
            {Object.entries(schema).map(([k], i) => (
              <li
                key={i}
                onClick={() => setCurrentSection(k)}
                className='underline hover:underline-offset-4 hover:cursor-pointer'>
                {k}
              </li>
            ))}
          </ul>
          <form className='overflow-y-auto max-h-[70vh] grid grid-cols-2 gap-4 relative'>
            {currentSectionJsx[currentSection] && (
              <>
                <label htmlFor='description' className='bold my-2 py-1'>
                  Description
                </label>
                <input
                  className='border-4 focus:border-purple-700 my-1 mr-8 p-1 px-2 outline-none'
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
              className='block my-2 ml-auto std-button'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CvSectionBuilder;
