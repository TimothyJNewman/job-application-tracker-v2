"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../../context/GlobalContext");
var LetterUpload_1 = require("./LetterUpload");
var PdfDisplay_1 = require("../../../components/PdfDisplay");
var microComponents_1 = require("../../../components/microComponents");
var LetterConstructorSection_1 = require("./LetterConstructorSection");
var LetterSection = function (_a) {
    var id = _a.id;
    var _b = (0, react_1.useState)(false), useLetterBuilder = _b[0], setUseLetterBuilder = _b[1];
    var _c = (0, react_1.useContext)(GlobalContext_1.GlobalContext), appsData = _c.appsData, userPath = _c.userPath;
    var appDetails = appsData.find(function (elem) { return elem.id === id; });
    return (<>
      <h1 id='letter' className='my-2 text-xl font-bold tracking-tight'>
        Letter
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <microComponents_1.Switch isChecked={useLetterBuilder} setIsChecked={setUseLetterBuilder} id='letterBuilderToggle' name='letterBuilderToggle' label='Use Letter Builder'/>
          {useLetterBuilder ? (<LetterConstructorSection_1["default"] id={id}/>) : (<LetterUpload_1["default"] id={id}/>)}
        </div>
        <div>
          {appDetails.cover_letter_url !== null ? (<PdfDisplay_1["default"] url={"atom://".concat(userPath).concat(appDetails.cover_letter_url)}/>) : (<div className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700' role='alert'>
              No Letter found
            </div>)}
        </div>
      </div>
    </>);
};
exports["default"] = LetterSection;
//# sourceMappingURL=LetterSection.js.map