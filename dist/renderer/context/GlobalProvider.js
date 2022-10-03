"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("./GlobalContext");
var GlobalProvider = function (props) {
    var _a = (0, react_1.useState)([]), appsData = _a[0], setAppsData = _a[1];
    var _b = (0, react_1.useState)(''), userPath = _b[0], setUserPath = _b[1];
    var _c = (0, react_1.useState)([]), seasonValues = _c[0], setSeasonValues = _c[1];
    var _d = (0, react_1.useState)(''), currentSeason = _d[0], setCurrentSeason = _d[1];
    return (<GlobalContext_1.GlobalContext.Provider value={{
            appsData: appsData,
            setAppsData: setAppsData,
            userPath: userPath,
            setUserPath: setUserPath,
            seasonValues: seasonValues,
            setSeasonValues: setSeasonValues,
            currentSeason: currentSeason,
            setCurrentSeason: setCurrentSeason
        }}>
      {props.children}
    </GlobalContext_1.GlobalContext.Provider>);
};
exports["default"] = GlobalProvider;
//# sourceMappingURL=GlobalProvider.js.map