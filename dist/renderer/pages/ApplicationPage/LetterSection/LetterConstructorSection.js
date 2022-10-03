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
var GlobalContext_1 = require("../../../context/GlobalContext");
var microComponents_1 = require("../../../components/microComponents");
var react_hot_toast_1 = require("react-hot-toast");
var CRUD_1 = require("../../../util/CRUD");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var LetterConstructorSection = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useContext)(GlobalContext_1.GlobalContext), setAppsData = _b.setAppsData, userPath = _b.userPath;
    var _c = (0, react_1.useState)({
        content: '',
        salutation: '',
        date: '',
        closing: '',
        receiverName: '',
        senderName: '',
        receiverAddress1: '',
        receiverAddress2: '',
        senderAddress1: '',
        senderAddress2: '',
        attached: ''
    }), letterFormValues = _c[0], setLetterFormValues = _c[1];
    var handleInputChange = function (event) {
        var _a;
        setLetterFormValues(__assign(__assign({}, letterFormValues), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var openFileExplorer = function (path) { };
    var generatePdf = function () {
        // TODO add check for valid input
        /**
         * Generate pdf in the background
         */
        var getPdfPromise = window.electron.getPdf('generate-pdf', 'letter', {
            id: id,
            name: String(id),
            detailsObject: letterFormValues
        });
        getPdfPromise
            .then(function (relativeLetterUrl) {
            (0, CRUD_1.updateDatabaseEntry)('UPDATE applications SET cover_letter_url=?, cover_letter_json=? WHERE id=?', [relativeLetterUrl, JSON.stringify(letterFormValues), id], function (_a) {
                var error = _a.error;
                if (error)
                    console.error(error);
                (0, CRUD_1.readDatabaseEntry)('SELECT * FROM applications', null, function (_a) {
                    var error = _a.error, result = _a.result;
                    if (error)
                        console.error(error);
                    setAppsData(result);
                });
            });
            console.log('New Letter PDF url: ', relativeLetterUrl);
        })["catch"](function (error) {
            console.error("PDF error: ".concat(error));
        });
        react_hot_toast_1.toast.promise(getPdfPromise, {
            loading: 'Loading',
            success: function (savePath) {
                return (<div className='flex'>
              <span className='grow'>
                Successfully generated Letter PDF{' '}
                <microComponents_1.Button Icon={react_bootstrap_icons_1.Folder2Open} value='Open' onClick={openFileExplorer("".concat(userPath).concat(savePath))}/>
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>);
            },
            error: function (error) {
                console.error(error);
                return 'Error generating Letter PDF';
            }
        }, {
            success: {
                duration: 10000
            }
        });
    };
    return (<div className='mb-2 pl-0.5'>
      <div className='my-2 flex justify-between'>
        <h1 id='cv-contructor' className='text-lg font-bold'>
          Letter constructor
        </h1>
        <microComponents_1.Button onClick={generatePdf} value='Generate Letter Pdf'/>
      </div>
      <div className='mb-4'>
        <label htmlFor='senderName' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Name
        </label>
        <input type='text' className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Sender Name' name='senderName' id='senderName' value={letterFormValues.senderName} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='senderAddress1' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Address Line 1
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='123 Pleasant Lane' name='senderAddress1' id='senderAddress1' value={letterFormValues.senderAddress1} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='senderAddress2' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Address Line 2
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='City, State 12345' name='senderAddress2' id='senderAddress2' value={letterFormValues.senderAddress2} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='receiverName' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Name
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Recepiant Name' name='receiverName' id='receiverName' value={letterFormValues.receiverName} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='receiverAddress1' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Address Line 1
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='123 Broadway' name='receiverAddress1' id='receiverAddress1' value={letterFormValues.receiverAddress1} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='receiverAddress2' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Address Line 2
        </label>
        <input type='text' className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='City, State 12345' name='receiverAddress2' id='receiverAddress2' value={letterFormValues.receiverAddress2} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='date' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Date
        </label>
        <input type='date' className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Date' name='date' id='date' value={letterFormValues.date} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='salutation' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Salutation
        </label>
        <input type='text' className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Salutation' name='salutation' id='salutation' value={letterFormValues.salutation} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='content' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Content
        </label>
        <textarea className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' name='content' id='content' value={letterFormValues.content} onChange={function (event) { return handleInputChange(event); }} rows='3' placeholder='Content'/>
      </div>
      <div className='mb-4'>
        <label htmlFor='closing' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Closing
        </label>
        <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Closing' name='closing' id='closing' value={letterFormValues.closing} onChange={function (event) { return handleInputChange(event); }}/>
      </div>
      <div className='mb-4'>
        <label htmlFor='attached' className='form-label mb-2 inline-block capitalize text-gray-700'>
          Attached
        </label>
        <textarea className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' name='attached' id='attached' value={letterFormValues.attached} onChange={function (event) { return handleInputChange(event); }} rows='3' placeholder='Curriculum Vitae and grades transcript'/>
      </div>
    </div>);
};
exports["default"] = LetterConstructorSection;
//# sourceMappingURL=LetterConstructorSection.js.map