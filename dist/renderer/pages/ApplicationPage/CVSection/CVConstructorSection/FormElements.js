"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var react_1 = require("react");
var IndividualFormElement_1 = require("./IndividualFormElement");
/**
 * gets input jsx given a schema
 */
var FormElements = function (_a) {
    var currentSection = _a.currentSection, currentSchema = _a.currentSchema, setCurrentSchema = _a.setCurrentSchema, currentFieldValues = _a.currentFieldValues, setCurrentFieldValues = _a.setCurrentFieldValues;
    (0, react_1.useEffect)(function () {
        var _a;
        if (Object.keys(currentSchema).length !== 0 &&
            Object.keys(currentFieldValues).length === 0) {
            if (Object.keys(currentFieldValues).length === 0) {
                setCurrentFieldValues((_a = {},
                    _a[currentSection] = getDefaultFieldValues(currentSchema[currentSection]),
                    _a.section = currentSection,
                    _a.description = '',
                    _a));
            }
        }
    }, [currentSchema]);
    var getDefaultArraySchema = function (schema, breadCrumbs) {
        var schemaSub = schema;
        for (var i = 0; i < breadCrumbs.length; i++) {
            if (i === breadCrumbs.length - 1) {
                return schemaSub[breadCrumbs[i]][0];
            }
            else {
                schemaSub = schemaSub[breadCrumbs[i]];
            }
        }
    };
    var getInputValue = function (breadCrumbs) {
        var inputState = null;
        var currentFieldValuesSub = currentFieldValues;
        for (var i = 0; i < breadCrumbs.length; i++) {
            if (i === breadCrumbs.length - 1) {
                inputState = currentFieldValuesSub[breadCrumbs[i]];
            }
            else {
                currentFieldValuesSub = currentFieldValuesSub[breadCrumbs[i]];
            }
        }
        return inputState;
    };
    var getInputJsxRecursive = function (schemaKey, schemaValue, breadCrumbs) {
        var returnVal;
        if (schemaValue.constructor === String) {
            return (<IndividualFormElement_1["default"] inputType={schemaValue} inputName={schemaKey} breadCrumbs={breadCrumbs} getInputValue={getInputValue} handleInputChange={handleInputChange}/>);
        }
        else if (schemaValue.constructor === Array) {
            returnVal = [];
            returnVal.push(<IndividualFormElement_1["default"] key={"".concat(schemaKey, "-objectLabel")} inputType='objectLabel' inputName={schemaKey} breadCrumbs={breadCrumbs}/>);
            var currentFieldValuesArray = void 0;
            var currentFieldValuesSub = currentFieldValues;
            for (var i = 0; i < breadCrumbs.length; i++) {
                if (i === breadCrumbs.length - 1) {
                    currentFieldValuesArray = currentFieldValuesSub[breadCrumbs[i]];
                }
                else {
                    currentFieldValuesSub = currentFieldValuesSub[breadCrumbs[i]];
                }
            }
            returnVal.push(<ol key={schemaKey} className='list-outside list-decimal pl-4'>
          {currentFieldValuesArray.map(function (elem, index) { return (<li key={"".concat(schemaKey, "-").concat(index)}>
              {getInputJsxRecursive('', schemaValue[0], __spreadArray(__spreadArray([], breadCrumbs, true), [
                        index,
                    ], false))}
            </li>); })}
        </ol>);
            returnVal.push(<IndividualFormElement_1["default"] key={"".concat(schemaKey, "-newFieldButton")} inputType='newFieldButton' inputName={schemaKey} breadCrumbs={breadCrumbs} addFieldHandler={addFieldHandler}/>);
        }
        else if (schemaValue.constructor === Object) {
            returnVal = [];
            returnVal.push(<IndividualFormElement_1["default"] key={"".concat(schemaKey, "-objectLabel")} inputType='objectLabel' inputName={schemaKey} breadCrumbs={breadCrumbs}/>);
            returnVal.push(<div key={schemaKey} className='pl-4'>
          {Object.entries(schemaValue).map(function (_a) {
                    var subSchemaKey = _a[0], subSchemaValue = _a[1];
                    return getInputJsxRecursive(subSchemaKey, subSchemaValue, __spreadArray(__spreadArray([], breadCrumbs, true), [
                        subSchemaKey,
                    ], false));
                })}
        </div>);
        }
        return returnVal;
    };
    var addFieldHandler = function (event, breadCrumbs) {
        modifyInputFields({
            schema: currentSchema,
            fieldValues: currentFieldValues,
            breadCrumbs: breadCrumbs
        });
    };
    /**
     * adds or deletes input fields for array inputs
     * if deleteIndex is null, add not delete
     */
    var modifyInputFields = function (_a) {
        var schema = _a.schema, fieldValues = _a.fieldValues, breadCrumbs = _a.breadCrumbs, _b = _a.deleteIndex, deleteIndex = _b === void 0 ? null : _b;
        var newSchema = __assign({}, schema);
        var newFieldValues = __assign({}, fieldValues);
        var schemaSub = newSchema;
        var fieldValuesSub = newFieldValues;
        for (var i = 0; i < breadCrumbs.length; i++) {
            if (i === breadCrumbs.length - 1) {
                if (deleteIndex) {
                    schemaSub[breadCrumbs[i]] = schemaSub[breadCrumbs[i]].filter(function (elem, i) { return i !== deleteIndex; });
                    fieldValuesSub[breadCrumbs[i]] = fieldValuesSub[breadCrumbs[i]].filter(function (elem, i) { return i !== deleteIndex; });
                }
                else {
                    schemaSub[breadCrumbs[i]] = __spreadArray(__spreadArray([], schemaSub[breadCrumbs[i]], true), [
                        getDefaultArraySchema(currentSchema, breadCrumbs),
                    ], false);
                    fieldValuesSub[breadCrumbs[i]] = __spreadArray(__spreadArray([], fieldValuesSub[breadCrumbs[i]], true), [
                        getDefaultFieldValues(getDefaultArraySchema(currentSchema, breadCrumbs)),
                    ], false);
                }
            }
            else {
                schemaSub = schemaSub[breadCrumbs[i]];
                fieldValuesSub = fieldValuesSub[breadCrumbs[i]];
            }
        }
        setCurrentSchema(newSchema);
        setCurrentFieldValues(newFieldValues);
    };
    var inputDefaultValue = {
        unavailable: null,
        shortText: '',
        longText: '',
        number: 0,
        date: ''
    };
    var getDefaultFieldValues = function (schemaValue) {
        var returnVal;
        if (schemaValue.constructor === String) {
            returnVal = inputDefaultValue[schemaValue];
        }
        else if (schemaValue.constructor === Array) {
            returnVal = schemaValue.map(function (subSchemaValue) {
                return getDefaultFieldValues(subSchemaValue);
            });
        }
        else if (schemaValue.constructor === Object) {
            returnVal = {};
            Object.entries(schemaValue).forEach(function (_a) {
                var subSchemaKey = _a[0], subSchemaValue = _a[1];
                returnVal[subSchemaKey] = getDefaultFieldValues(subSchemaValue);
            });
        }
        return returnVal;
    };
    var handleInputChange = function (event, breadCrumbs) {
        var newFieldValues = __assign({}, currentFieldValues);
        var fieldValuesSub = newFieldValues;
        for (var i = 0; i < breadCrumbs.length; i++) {
            if (i === breadCrumbs.length - 1) {
                fieldValuesSub[breadCrumbs[i]] = event.target.value;
            }
            else {
                fieldValuesSub = fieldValuesSub[breadCrumbs[i]];
            }
        }
        setCurrentFieldValues(newFieldValues);
    };
    return (<>
      {currentSchema[currentSection] !== undefined &&
            Object.keys(currentFieldValues).length !== 0
            ? getInputJsxRecursive(currentSection, currentSchema[currentSection], [currentSection])
            : null}
    </>);
};
exports["default"] = FormElements;
//# sourceMappingURL=FormElements.js.map