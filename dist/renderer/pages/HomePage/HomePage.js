"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../context/GlobalContext");
var HomePage = function () {
    var currentSeason = (0, react_1.useContext)(GlobalContext_1.GlobalContext).currentSeason;
    return (<div className='p-4'>
      <h1 id='home-page' className='text-xl font-bold tracking-tight'>
        You applications at a glance
      </h1>
      <p>Welcome to your Job Application Tracker!</p>
      {(currentSeason === '' || currentSeason === undefined) && (<p>
          Current season eg. "2020 Application Season" not set. This can be set
          in the setting page.
        </p>)}
    </div>);
};
exports["default"] = HomePage;
//# sourceMappingURL=HomePage.js.map