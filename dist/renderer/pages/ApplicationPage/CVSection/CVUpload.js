"use strict";
exports.__esModule = true;
var react_1 = require("react");
var microComponents_1 = require("../../../components/microComponents");
var react_hot_toast_1 = require("react-hot-toast");
var CRUD_1 = require("../../../util/CRUD");
var GlobalContext_1 = require("../../../context/GlobalContext");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var CVUpload = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useContext)(GlobalContext_1.GlobalContext), setAppsData = _b.setAppsData, userPath = _b.userPath;
    var openFileExplorer = function (path) { };
    var saveCVPdfHandler = function (uploadPdfUrl) {
        var saveCVPdfPromise = window.electron.savePdf('save-cv', {
            applicationID: id,
            uploadPdfUrl: uploadPdfUrl
        });
        saveCVPdfPromise
            .then(function (savedRelativeUrl) {
            (0, CRUD_1.updateDatabaseEntry)('UPDATE applications SET cv_url=? WHERE id=?', [savedRelativeUrl, id], function (_a) {
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
        react_hot_toast_1.toast.promise(saveCVPdfPromise, {
            loading: 'Loading',
            success: function (savePath) {
                return (<div className='flex'>
              <span className='grow'>
                Successfully uploaded PDF{' '}
                <microComponents_1.Button Icon={react_bootstrap_icons_1.Folder2Open} value='Open' onClick={openFileExplorer("".concat(userPath).concat(savePath))}/>
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>);
            },
            error: 'Error uploading CV PDF'
        }, {
            success: {
                duration: 10000
            }
        });
    };
    return (<microComponents_1.FilePicker label='Upload CV PDF' accept='.pdf' onChange={function (event) { return saveCVPdfHandler(event.target.files[0].path); }} id='uploadCVPdfPicker'/>);
};
exports["default"] = CVUpload;
//# sourceMappingURL=CVUpload.js.map