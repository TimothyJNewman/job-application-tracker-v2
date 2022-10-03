"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../../context/GlobalContext");
var react_hot_toast_1 = require("react-hot-toast");
var CRUD_1 = require("../../../util/CRUD");
var PdfDisplay_1 = require("../../../components/PdfDisplay");
var microComponents_1 = require("../../../components/microComponents");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var JobDescriptionSection = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useContext)(GlobalContext_1.GlobalContext), appsData = _b.appsData, setAppsData = _b.setAppsData, userPath = _b.userPath;
    var appDetails = appsData.find(function (elem) { return elem.id === id; });
    var _c = (0, react_1.useState)(''), textArea = _c[0], setTextArea = _c[1];
    (0, react_1.useEffect)(function () {
        setTextArea(appDetails.job_description);
    }, [appDetails]);
    var saveJobDescPdfHandler = function (uploadPdfUrl) {
        var saveJobDescPdfPromise = window.electron.savePdf('save-job-description', {
            applicationID: id,
            uploadPdfUrl: uploadPdfUrl
        });
        saveJobDescPdfPromise
            .then(function (savedRelativeUrl) {
            (0, CRUD_1.updateDatabaseEntry)('UPDATE applications SET job_description_url=? WHERE id=?', [savedRelativeUrl, id], function (_a) {
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
        })["catch"](function (error) {
            console.error(error);
        });
        react_hot_toast_1.toast.promise(saveJobDescPdfPromise, {
            loading: 'Saving PDF',
            success: function (savePath) {
                return (<div className='flex'>
              <span className='grow'>
                Successfully uploaded PDF{' '}
                <microComponents_1.Button Icon={react_bootstrap_icons_1.Folder2Open} value='Open' onClick={openFileExplorer("".concat(userPath).concat(savePath))}/>
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>);
            },
            error: 'Error uploading job description PDF'
        }, {
            success: {
                duration: 10000
            }
        });
    };
    var saveJobDescTextHandler = function () {
        (0, CRUD_1.updateDatabaseEntry)('UPDATE applications SET job_description=? WHERE id=?', [textArea, id], function (_a) {
            var error = _a.error;
            if (error) {
                console.error(error);
                react_hot_toast_1.toast.error('Error: Job description text not saved');
            }
            (0, CRUD_1.readDatabaseEntry)('SELECT * FROM applications', null, function (_a) {
                var error = _a.error, result = _a.result;
                if (error) {
                    console.error(error);
                    react_hot_toast_1.toast.error('Error: Job description text not saved');
                }
                react_hot_toast_1.toast.success('Successfully saved job description text');
                setAppsData(result);
            });
        });
    };
    var openFileExplorer = function (path) { };
    return (<div className='mb-2'>
      <h1 id='job-description' className='my-2 text-xl font-bold tracking-tight'>
        Job Description
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <textarea className='px-2Z mb-2 h-48 w-full rounded border-2 border-green-500 p-1 outline-none focus:border-blue-500' value={textArea} onChange={function (event) { return setTextArea(event.target.value); }}></textarea>
          <div className='flex justify-end'>
            <microComponents_1.Button onClick={saveJobDescTextHandler} value='Save' color='blue'/>
          </div>
        </div>
        <div>
          {appDetails.job_description_url !== null ? (<PdfDisplay_1["default"] url={"atom://".concat(userPath).concat(appDetails.job_description_url)}/>) : (<div className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700' role='alert'>
              No Job Description PDF found. Upload a PDF.
            </div>)}
          <microComponents_1.FilePicker label='Upload Job Description PDF' accept='.pdf' onChange={function (event) {
            return saveJobDescPdfHandler(event.target.files[0].path);
        }} id='uploadJobDescPdfPicker'/>
        </div>
      </div>
    </div>);
};
exports["default"] = JobDescriptionSection;
//# sourceMappingURL=JobDescriptionSection.js.map