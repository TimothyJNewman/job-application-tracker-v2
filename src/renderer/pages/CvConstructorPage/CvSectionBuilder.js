import React, { useEffect, useState, useReducer, useRef } from 'react';
import useClickOutside from '../../util/useClickOutside';
import { PlusCircleFill, XCircleFill } from 'react-bootstrap-icons';
import schema from './jsonSchema';

const CvSectionBuilder = ({ addSectionCallback, onClickOutside }) => {
  const [currentSection, setCurrentSection] = useState('basics');
  const [currentSchema, setCurrentSchema] = useState({});
  const [currentFieldValues, setCurrentFieldValues] = useState({ section: "", description: "" });
  const [currentSectionJsx, setCurrentSectionJsx] = useState({});

  const clickRef = useRef();
  useClickOutside(clickRef, 'overlay-blur', onClickOutside);

  useEffect(() => {
    let newSchemaValue;
    if (schema[currentSection].constructor === Array) {
      newSchemaValue = { ...schema[currentSection][0] };
    } else if (schema[currentSection].constructor === Object) {
      newSchemaValue = { ...schema[currentSection] };
    }
    setCurrentSchema({ [currentSection]: newSchemaValue });
    setCurrentFieldValues({ [currentSection]: {}, section: currentSection, description: "" });
  }, [currentSection]);

  useEffect(() => {
    if (
      Object.keys(currentSchema).length !== 0 &&
      Object.keys(currentFieldValues).length === 0
    ) {
      const newFieldValues = getDefaultFieldValues(
        currentSchema[currentSection]
      );
      setCurrentFieldValues({ [currentSection]: newFieldValues, section: currentSection, description: "" });
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
    shortText: '',
    longText: '',
    number: 0,
    date: '',
  };

  const getInputFieldJsx = ({ inputType, inputName, breadCrumbs }) => {
    let state;
    console.log(currentFieldValues, breadCrumbs)
    if (breadCrumbs) {
      switch (breadCrumbs.length) {
        case 1:
          state = currentFieldValues[breadCrumbs[0]];
          break;
        case 2:
          state = currentFieldValues[breadCrumbs[0]][breadCrumbs[1]];
          break;
        case 3:
          state =
            currentFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]];
          break;
        case 4:
          state =
            currentFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]][
            breadCrumbs[3]
            ];
          break;
      }
    }
    const inputFieldJsxDictionary = {
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
            onClick={(e) => addFieldHandler(e, breadCrumbs)}
            className='std-button'
            type='button'>
            {`Add ${inputName}`}
          </button>
        </React.Fragment>
      ),
      shortText: ({ inputName, state, breadCrumbs }) => (
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
            value={state}
            onChange={(e) =>
              handleInputChange(e, currentFieldValues, breadCrumbs)
            }
          />
        </React.Fragment>
      ),
      longText: ({ inputName, state, breadCrumbs }) => (
        <React.Fragment key={inputName}>
          <label htmlFor={inputName} className='italic my-2 py-1'>
            {inputName}
          </label>
          <textarea
            className='border-4 focus:border-purple-700 my-1 mr-8 p-1 px-2 outline-none'
            name={inputName}
            id={inputName}
            value={state}
            onChange={(e) =>
              handleInputChange(e, currentFieldValues, breadCrumbs)
            }></textarea>
        </React.Fragment>
      ),
      number: ({ inputName, state, breadCrumbs }) => (
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
            value={state}
            onChange={(e) =>
              handleInputChange(e, currentFieldValues, breadCrumbs)
            }
          />
        </React.Fragment>
      ),
      date: ({ inputName, state, breadCrumbs }) => (
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
              value={state}
              onChange={(e) =>
                handleInputChange(e, currentFieldValues, breadCrumbs)
              }
            />
          </div>
        </React.Fragment>
      ),
    };
    return inputFieldJsxDictionary[inputType]({
      inputName,
      state,
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
            getInputJsxRecursive(`${schemaKey}-${index}`, subSchemaValue, [...breadCrumbs, index])
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
      throw new Error('Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs);
    }
    switch (breadCrumbs.length) {
      case 1:
        return schema[breadCrumbs[0]][0];
      case 2:
        return schema[breadCrumbs[0]][breadCrumbs[1]][0];
      case 3:
        return schema[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]][0];
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
      throw new Error('Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs);
    }
    let newSchema = { ...schema };
    let newFieldValues = { ...fieldValues };
    switch (breadCrumbs.length) {
      case 1:
        if (deleteIndex) {
          newSchema[breadCrumbs[0]] = newSchema[breadCrumbs[0]].filter(
            (e, i) => i !== deleteIndex
          );
          newFieldValues[breadCrumbs[0]] = newFieldValues[
            breadCrumbs[0]
          ].filter((e, i) => i !== deleteIndex);
        } else {
          newSchema[breadCrumbs[0]] = [
            ...newSchema[breadCrumbs[0]],
            getDefaultArraySchema(currentSchema, breadCrumbs),
          ];
          newFieldValues[breadCrumbs[0]] = [
            ...newFieldValues[breadCrumbs[0]],
            getDefaultFieldValues(
              getDefaultArraySchema(currentSchema, breadCrumbs)
            ),
          ];
        }
        break;
      case 2:
        if (deleteIndex) {
          newSchema[breadCrumbs[0]][breadCrumbs[1]] = newSchema[breadCrumbs[0]][
            breadCrumbs[1]
          ].filter((e, i) => i !== deleteIndex);
          newFieldValues[breadCrumbs[0]][breadCrumbs[1]] = newFieldValues[
            breadCrumbs[0]
          ][breadCrumbs[1]].filter((e, i) => i !== deleteIndex);
        } else {
          newSchema[breadCrumbs[0]][breadCrumbs[1]] = [
            ...newSchema[breadCrumbs[0]][breadCrumbs[1]],
            getDefaultArraySchema(currentSchema, breadCrumbs),
          ];
          newFieldValues[breadCrumbs[0]][breadCrumbs[1]] = [
            ...newFieldValues[breadCrumbs[0]][breadCrumbs[1]],
            getDefaultFieldValues(
              getDefaultArraySchema(currentSchema, breadCrumbs)
            ),
          ];
        }
        break;
      case 3:
        if (deleteIndex) {
          newSchema[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]] = newSchema[
            breadCrumbs[0]
          ][breadCrumbs[1]][breadCrumbs[2]].filter((e, i) => i !== deleteIndex);
          newFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]] =
            newFieldValues[breadCrumbs[0]][breadCrumbs[1]][
              breadCrumbs[2]
            ].filter((e, i) => i !== deleteIndex);
        } else {
          newSchema[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]] = [
            ...newSchema[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]],
            getDefaultArraySchema(currentSchema, breadCrumbs),
          ];
          newFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]] = [
            ...newFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]],
            getDefaultFieldValues(
              getDefaultArraySchema(currentSchema, breadCrumbs)
            ),
          ];
        }
        break;
    }
    setCurrentSchema(newSchema);
    setCurrentFieldValues(newFieldValues);
  };

  const addFieldHandler = (e, breadCrumbs) => {
    modifyInputFields(currentSchema, currentFieldValues, breadCrumbs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSectionCallback(currentFieldValues);
  };

  const handleInputChange = (e, fieldValues, breadCrumbs) => {
    if (breadCrumbs.length > 4 || breadCrumbs.length <= 0) {
      throw new Error(
        'Breadcrumbs cannot be less than 1 or greater than 3: ' + breadCrumbs
      );
    }
    let newFieldValues = { ...fieldValues };
    switch (breadCrumbs.length) {
      case 1:
        newFieldValues[breadCrumbs[0]] = e.target.value;
        break;
      case 2:
        newFieldValues[breadCrumbs[0]][breadCrumbs[1]] = e.target.value;
        break;
      case 3:
        newFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]] =
          e.target.value;
        break;
      case 4:
        newFieldValues[breadCrumbs[0]][breadCrumbs[1]][breadCrumbs[2]][
          breadCrumbs[3]
        ] = e.target.value;
        break;
    }
    setCurrentFieldValues(newFieldValues);
  };

  return (
    <div className='flex fixed h-screen w-screen items-center justify-center top-0 left-0 backdrop-blur-md backdrop-brightness-75'>
      <div id='overlay-blur' className='fixed h-screen w-screen'></div>
      <div
        ref={clickRef}
        className='z-10 m-8 w-full flex items-center justify-center'>
        <div className='bg-white p-4 grow max-w-3xl'>
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
