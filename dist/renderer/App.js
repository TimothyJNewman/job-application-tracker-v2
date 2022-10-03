"use strict";
exports.__esModule = true;
var react_1 = require("react");
var NavBar_1 = require("./components/NavBar");
var react_router_dom_1 = require("react-router-dom");
var react_hot_toast_1 = require("react-hot-toast");
var index_1 = require("./pages/index");
var GlobalProvider_1 = require("./context/GlobalProvider");
var GlobalContext_1 = require("./context/GlobalContext");
var CRUD_1 = require("./util/CRUD");
var react_hot_toast_2 = require("react-hot-toast");
var App = function () {
    var _a = (0, react_1.useContext)(GlobalContext_1.GlobalContext), setUserPath = _a.setUserPath, setSeasonValues = _a.setSeasonValues, setCurrentSeason = _a.setCurrentSeason;
    (0, react_1.useEffect)(function () {
        window.electron.getPath('get-user-data-path').then(function (path) {
            setUserPath(path);
        });
        (0, CRUD_1.readDatabaseEntry)('SELECT * FROM seasons', null, function (_a) {
            var error = _a.error, result = _a.result;
            if (error)
                console.error(error);
            else {
                setSeasonValues(result);
                window.electron
                    .modifySettings('settings', 'season')
                    .then(function (value) {
                    if (value !== undefined && value !== '')
                        setCurrentSeason(value);
                    else if (result.length === 1) {
                        setCurrentSeason(result[0].season);
                    }
                })["catch"](function (error) {
                    react_hot_toast_2.toast.error(error.message);
                    console.error(error);
                });
            }
        });
    }, []);
    return (<div className='App'>
      <react_hot_toast_1.Toaster />
      <react_router_dom_1.MemoryRouter>
        <NavBar_1["default"] />
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path='/application/:id' element={<index_1.ApplicationPage />}/>
          <react_router_dom_1.Route path='/applications' element={<index_1.ApplicationSummaryPage />}/>
          <react_router_dom_1.Route path='/settings' element={<index_1.SettingsPage />}/>
          <react_router_dom_1.Route path='/' element={<index_1.HomePage />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.MemoryRouter>
    </div>);
};
var AppWrapper = function () { return (<GlobalProvider_1["default"]>
    <App />
  </GlobalProvider_1["default"]>); };
exports["default"] = AppWrapper;
//# sourceMappingURL=App.js.map