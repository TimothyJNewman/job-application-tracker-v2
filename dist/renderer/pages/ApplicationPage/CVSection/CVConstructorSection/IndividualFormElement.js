"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var IndividualFormElement = function (_a) {
    var inputType = _a.inputType, inputName = _a.inputName, breadCrumbs = _a.breadCrumbs, addFieldHandler = _a.addFieldHandler, getInputValue = _a.getInputValue, handleInputChange = _a.handleInputChange;
    var inputFieldJsxDictionary = {
        // unavailable: ({ inputName }) => (
        //   <>
        //     {inputName}
        //     <span>Not available</span>
        //   </>
        // ),
        unavailable: function () { return null; },
        objectLabel: function (_a) {
            var inputName = _a.inputName;
            return (<h2 key={inputName} className='mb-2 font-medium capitalize'>
        {inputName}
      </h2>);
        },
        newFieldButton: function (_a) {
            var inputName = _a.inputName, breadCrumbs = _a.breadCrumbs;
            return (<div key={"add-button-".concat(inputName)} className='py-2'>
        <button onClick={function (event) { return addFieldHandler(event, breadCrumbs); }} type='button' data-mdb-ripple='true' data-mdb-ripple-color='light' className='align-center my-2 ml-auto flex rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
          <react_bootstrap_icons_1.PlusLg className='mr-2 h-4 w-4'/>
          {"Add ".concat(inputName)}
        </button>
      </div>);
        },
        shortText: function (_a) {
            var inputName = _a.inputName, breadCrumbs = _a.breadCrumbs;
            return (<div key={inputName} className='mb-4'>
        <label htmlFor={inputName} className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Text input' title={inputName} name={inputName} id={inputName} value={getInputValue(breadCrumbs)} onChange={function (event) { return handleInputChange(event, breadCrumbs); }}/>
      </div>);
        },
        longText: function (_a) {
            var inputName = _a.inputName, breadCrumbs = _a.breadCrumbs;
            return (<div key={inputName} className='mb-4'>
        <label htmlFor={inputName} className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <textarea className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' title={inputName} name={inputName} id={inputName} value={getInputValue(breadCrumbs)} onChange={function (event) { return handleInputChange(event, breadCrumbs); }} rows='3' placeholder='Your message'></textarea>
      </div>);
        },
        number: function (_a) {
            var inputName = _a.inputName, breadCrumbs = _a.breadCrumbs;
            return (<div key={inputName} className='mb-4'>
        <label htmlFor={inputName} className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input type='number' className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' title={inputName} name={inputName} id={inputName} value={getInputValue(breadCrumbs)} onChange={function (event) { return handleInputChange(event, breadCrumbs); }} placeholder='Number input'/>
      </div>);
        },
        date: function (_a) {
            var inputName = _a.inputName, breadCrumbs = _a.breadCrumbs;
            return (<div key={inputName} className='mb-4'>
        <label htmlFor={inputName} className='form-label mb-2 inline-block capitalize text-gray-700'>
          {inputName}
        </label>
        <input type='date' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Text input' title={inputName} name={inputName} id={inputName} value={getInputValue(breadCrumbs)} onChange={function (event) { return handleInputChange(event, breadCrumbs); }}/>
      </div>);
        }
    };
    return inputFieldJsxDictionary[inputType]({
        inputName: inputName,
        breadCrumbs: breadCrumbs
    });
};
exports["default"] = IndividualFormElement;
//# sourceMappingURL=IndividualFormElement.js.map