"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../context/GlobalContext");
var react_router_dom_1 = require("react-router-dom");
var LetterSection_1 = require("./LetterSection/LetterSection");
var ApplicationDetails_1 = require("./ApplicationDetails");
var JobDescriptionSection_1 = require("./JobDescriptionSection/JobDescriptionSection");
var CVSection_1 = require("./CVSection/CVSection");
var ApplicationPage = function () {
    var _a = (0, react_1.useContext)(GlobalContext_1.GlobalContext), appsData = _a.appsData, setAppsData = _a.setAppsData;
    var id = Number((0, react_router_dom_1.useParams)().id);
    return (<div className='px-4'>
      <ApplicationDetails_1["default"] id={id} appsData={appsData} setAppsData={setAppsData}/>
      <div>
        <ul className='nav nav-pills flex list-none flex-col flex-wrap pl-0 sm:flex-row' id='pills-tab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <a href='#pills-desc' className=' nav-link active my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mr-2' id='pills-desc-tab' data-bs-toggle='pill' data-bs-target='#pills-desc' role='tab' aria-controls='pills-desc' aria-selected='true'>
              Job Description
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a href='#pills-cv' className=' nav-link my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mx-2' id='pills-cv-tab' data-bs-toggle='pill' data-bs-target='#pills-cv' role='tab' aria-controls='pills-cv' aria-selected='false'>
              Curriculam Vitae
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a href='#pills-letter' className=' nav-link my-2 block rounded px-6 py-3 text-xs font-medium uppercase leading-tight focus:outline-none focus:ring-0 sm:mx-2' id='pills-letter-tab' data-bs-toggle='pill' data-bs-target='#pills-letter' role='tab' aria-controls='pills-letter' aria-selected='false'>
              Letter Builder
            </a>
          </li>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <div className='active show tab-pane fade' id='pills-desc' role='tabpanel' aria-labelledby='pills-desc-tab'>
          <JobDescriptionSection_1["default"] id={id}/>
        </div>
        <div className='fade tab-pane' id='pills-cv' role='tabpanel' aria-labelledby='pills-cv-tab'>
          <CVSection_1["default"] id={id}/>
        </div>
        <div className='fade tab-pane' id='pills-letter' role='tabpanel' aria-labelledby='pills-letter-tab'>
          <LetterSection_1["default"] id={id}/>
        </div>
      </div>
    </div>);
};
exports["default"] = ApplicationPage;
//# sourceMappingURL=ApplicationPage.js.map