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
exports.__esModule = true;
var react_1 = require("react");
var template2_schema_1 = require("../../../../constants/template2_schema");
var microComponents_1 = require("../../../../components/microComponents");
var FormElements_1 = require("./FormElements");
var NewCVSectionForm = function (_a) {
    var addSectionCallback = _a.addSectionCallback, currentSection = _a.currentSection;
    var _b = (0, react_1.useState)({}), currentSchema = _b[0], setCurrentSchema = _b[1];
    var _c = (0, react_1.useState)({}), currentFieldValues = _c[0], setCurrentFieldValues = _c[1];
    var _d = (0, react_1.useState)(''), currentDescription = _d[0], setCurrentDescription = _d[1];
    (0, react_1.useEffect)(function () {
        var _a;
        var newSchemaValue = template2_schema_1["default"][currentSection];
        if (template2_schema_1["default"][currentSection].constructor === Array) {
            newSchemaValue = __assign({}, template2_schema_1["default"][currentSection][0]);
        }
        else if (template2_schema_1["default"][currentSection].constructor === Object) {
            newSchemaValue = __assign({}, template2_schema_1["default"][currentSection]);
        }
        setCurrentSchema((_a = {}, _a[currentSection] = newSchemaValue, _a));
        setCurrentFieldValues({});
    }, [currentSection]);
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
    var handleSubmit = function (event) {
        var _a;
        event.preventDefault();
        addSectionCallback(currentFieldValues, currentDescription);
        // reset values to default
        setCurrentFieldValues((_a = {},
            _a[currentSection] = getDefaultFieldValues(currentSchema[currentSection]),
            _a.section = currentSection,
            _a.description = '',
            _a));
        setCurrentDescription("");
    };
    return (<div className='fade modal fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm' id='newCVSectionModal' tabIndex='-1' aria-labelledby='newCVSectionModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-scrollable pointer-events-none relative w-auto'>
        <div className='modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none'>
          <div className='modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4'>
            <h2 className='text-xl font-medium capitalize leading-normal text-gray-800' id='newCVSectionModalLabel'>
              {currentSection} <span className='text-sm'>section builder</span>
            </h2>
            <button type='button' className='btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body px-4 py-2'>
            <form className='relative'>
              <div className='mb-2 border-b border-gray-200 pb-2'>
                <label htmlFor='description' className='form-label mb-2 inline-block font-medium text-gray-700'>
                  Description
                </label>
                <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Text input' title='Description' name='description' id='description' value={currentDescription} onChange={function (event) {
            return setCurrentDescription(event.target.value);
        }}/>
              </div>
              <FormElements_1["default"] currentSection={currentSection} currentSchema={currentSchema} setCurrentSchema={setCurrentSchema} currentFieldValues={currentFieldValues} setCurrentFieldValues={setCurrentFieldValues}/>
            </form>
          </div>
          <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4'>
            <div className='flex items-center gap-x-2'>
              <microComponents_1.Button additionalAttributes={{ 'data-bs-dismiss': 'modal' }} value='Cancel' color='purple'/>
              <microComponents_1.Button additionalAttributes={{ 'data-bs-dismiss': 'modal' }} onClick={handleSubmit} value='Submit' color='blue'/>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports["default"] = NewCVSectionForm;
//# sourceMappingURL=NewCVSectionForm.js.map