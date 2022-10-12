import React, { useEffect } from 'react';
import IndividualFormElement from './IndividualFormElement';

/**
 * gets input jsx given a schema
 */
const FormElements = ({
  currentSection,
  currentSchema,
  setCurrentSchema,
  currentFieldValues,
  setCurrentFieldValues,
}) => {
  useEffect(() => {
    if (
      Object.keys(currentSchema).length !== 0 &&
      Object.keys(currentFieldValues).length === 0
    ) {
      if (Object.keys(currentFieldValues).length === 0) {
        setCurrentFieldValues({
          [currentSection]: getDefaultFieldValues(
            currentSchema[currentSection]
          ),
          section: currentSection,
          description: '',
        });
      }
    }
  }, [currentSchema]);

  const getDefaultArraySchema = (schema, breadCrumbs) => {
    let schemaSub = schema;
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (i === breadCrumbs.length - 1) {
        return schemaSub[breadCrumbs[i]][0];
      } else {
        schemaSub = schemaSub[breadCrumbs[i]];
      }
    }
  };

  const getInputValue = (breadCrumbs) => {
    let inputState = null;
    let currentFieldValuesSub = currentFieldValues;
    for (let i = 0; i < breadCrumbs.length; i++) {
      if (i === breadCrumbs.length - 1) {
        inputState = currentFieldValuesSub[breadCrumbs[i]];
      } else {
        currentFieldValuesSub = currentFieldValuesSub[breadCrumbs[i]];
      }
    }
    return inputState;
  };

  const getInputJsxRecursive = (schemaKey, schemaValue, breadCrumbs) => {
    let returnVal;
    if (schemaValue.constructor === String) {
      return (
        <IndividualFormElement
          inputType={schemaValue}
          inputName={schemaKey}
          breadCrumbs={breadCrumbs}
          getInputValue={getInputValue}
          handleInputChange={handleInputChange}
        />
      );
    } else if (schemaValue.constructor === Array) {
      returnVal = [];
      returnVal.push(
        <IndividualFormElement
          key={`${schemaKey}-objectLabel`}
          inputType='objectLabel'
          inputName={schemaKey}
          breadCrumbs={breadCrumbs}
        />
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
        <ol key={schemaKey} className='list-outside list-decimal pl-4'>
          {currentFieldValuesArray.map((elem, index) => (
            <li key={`${schemaKey}-${index}`}>
              {getInputJsxRecursive('', schemaValue[0], [
                ...breadCrumbs,
                index,
              ])}
            </li>
          ))}
        </ol>
      );
      returnVal.push(
        <IndividualFormElement
          key={`${schemaKey}-newFieldButton`}
          inputType='newFieldButton'
          inputName={schemaKey}
          breadCrumbs={breadCrumbs}
          addFieldHandler={addFieldHandler}
        />
      );
    } else if (schemaValue.constructor === Object) {
      returnVal = [];
      returnVal.push(
        <IndividualFormElement
          key={`${schemaKey}-objectLabel`}
          inputType='objectLabel'
          inputName={schemaKey}
          breadCrumbs={breadCrumbs}
        />
      );
      returnVal.push(
        <div key={schemaKey} className='pl-4'>
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

  const addFieldHandler = (event, breadCrumbs) => {
    modifyInputFields({
      schema: currentSchema,
      fieldValues: currentFieldValues,
      breadCrumbs,
    });
  };

  /**
   * adds or deletes input fields for array inputs
   * if deleteIndex is null, add not delete
   */
  const modifyInputFields = ({
    schema,
    fieldValues,
    breadCrumbs,
    deleteIndex = null,
  }) => {
    let newSchema = { ...schema };
    let newFieldValues = { ...fieldValues };
    let schemaSub = newSchema;
    let fieldValuesSub = newFieldValues;
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

  const handleInputChange = (event, breadCrumbs) => {
    let newFieldValues = { ...currentFieldValues };
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
      {currentSchema[currentSection] !== undefined &&
      Object.keys(currentFieldValues).length !== 0
        ? getInputJsxRecursive(currentSection, currentSchema[currentSection], [
            currentSection,
          ])
        : null}
    </>
  );
};

export default FormElements;
