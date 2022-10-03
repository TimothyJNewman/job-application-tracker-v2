"use strict";
exports.__esModule = true;
var react_1 = require("react");
var microComponents_1 = require("../../../components/microComponents");
var GlobalContext_1 = require("../../../context/GlobalContext");
var CVUpload_1 = require("./CVUpload");
var CVConstructorSection_1 = require("./CVConstructorSection/CVConstructorSection");
var PdfDisplay_1 = require("../../../components/PdfDisplay");
var CVSection = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useState)(false), useCVBuilder = _b[0], setUseCVBuilder = _b[1];
    var _c = (0, react_1.useContext)(GlobalContext_1.GlobalContext), appsData = _c.appsData, userPath = _c.userPath;
    var appDetails = appsData.find(function (elem) { return elem.id === id; });
    return (<>
      <h1 id='job-description' className='my-2 text-xl font-bold tracking-tight'>
        Curriculam Vitae
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <microComponents_1.Switch isChecked={useCVBuilder} setIsChecked={setUseCVBuilder} id='cvBuilderToggle' name='cvBuilderToggle' label='Use CV Builder'/>
          {useCVBuilder ? (<CVConstructorSection_1["default"] id={id}/>) : (<CVUpload_1["default"] id={id}/>)}
        </div>
        <div>
          {appDetails.cv_url !== null ? (<PdfDisplay_1["default"] url={"atom://".concat(userPath).concat(appDetails.cv_url)}/>) : (<div className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700' role='alert'>
              No CV PDF found. Click generate PDF to create a new one.
            </div>)}
        </div>
      </div>
    </>);
};
exports["default"] = CVSection;
//# sourceMappingURL=CVSection.js.map