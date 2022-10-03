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
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var react_hot_toast_1 = require("react-hot-toast");
var FormElements_1 = require("./FormElements");
var EditCVSectionForm = function (_a) {
    var elementToggleClickHandler = _a.elementToggleClickHandler, editSectionCallback = _a.editSectionCallback, id = _a.id, currentSection = _a.currentSection, currentFieldValuesDatabase = _a.currentFieldValuesDatabase, currentDescriptionDatabase = _a.currentDescriptionDatabase;
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
    (0, react_1.useEffect)(function () {
        var _a;
        if (Object.keys(currentSchema).length !== 0 &&
            Object.keys(currentFieldValues).length === 0) {
            setCurrentFieldValues((_a = {},
                _a[currentSection] = currentFieldValuesDatabase,
                _a.section = currentSection,
                _a.description = '',
                _a));
            setCurrentDescription(currentDescriptionDatabase);
        }
    }, [currentSchema]);
    var handleSubmit = function (event) {
        event.preventDefault();
        react_hot_toast_1.toast.success('Successfully saved');
        editSectionCallback(currentFieldValues, currentDescription, id);
    };
    return (<>
      <div className='group relative z-20 flex items-center px-4 py-2 shadow-md'>
        <div className='ease h-5 w-1 bg-red-600 opacity-80 duration-500 group-hover:h-0 group-hover:w-0 group-hover:opacity-0'></div>
        <button aria-label='Delete section' onClick={function () { return elementToggleClickHandler('used', id); }} className='ease mr-2 flex w-0 items-center justify-center opacity-20 transition transition-[width] duration-500 group-hover:w-6 group-hover:opacity-100 '>
          <react_bootstrap_icons_1.XCircleFill className='h-5 w-5 text-red-600'/>
        </button>
        <h1 id='cv-section-builder' className='grow text-xl font-bold capitalize'>
          {currentSection} section builder
        </h1>
        <button type='submit' onClick={handleSubmit} data-mdb-ripple='true' data-mdb-ripple-color='light' className='ml-auto block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
          Save
        </button>
      </div>
      <div className='flex w-full items-center justify-center'>
        <div className='grow overflow-y-scroll bg-white p-4'>
          <form className='relative max-h-[70vh]'>
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
      </div>
    </>);
};
exports["default"] = EditCVSectionForm;
//# sourceMappingURL=EditCVSectionForm.js.map