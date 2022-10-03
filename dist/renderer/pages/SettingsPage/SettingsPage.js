"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GlobalContext_1 = require("../../context/GlobalContext");
var react_hot_toast_1 = require("react-hot-toast");
var microComponents_1 = require("../../components/microComponents");
var CRUD_1 = require("../../util/CRUD");
var SettingsPage = function () {
    var _a = (0, react_1.useContext)(GlobalContext_1.GlobalContext), seasonValues = _a.seasonValues, setSeasonValues = _a.setSeasonValues, currentSeason = _a.currentSeason, setCurrentSeason = _a.setCurrentSeason;
    var _b = (0, react_1.useState)(''), currentSeasonLocal = _b[0], setCurrentSeasonLocal = _b[1];
    (0, react_1.useEffect)(function () {
        setCurrentSeasonLocal(currentSeason);
    }, []);
    var updateSeason = function () {
        if (currentSeasonLocal !== undefined && currentSeasonLocal !== '') {
            window.electron
                .modifySettings('settings', 'season', currentSeasonLocal)
                .then(function (result) {
                if (result !== undefined) {
                    setCurrentSeason(currentSeasonLocal);
                    react_hot_toast_1.toast.success("Season updated to ".concat(result.value, "!"));
                }
            })["catch"](function (error) {
                react_hot_toast_1.toast.error(error.message);
                console.error(error);
            });
        }
    };
    var createSeason = function () {
        window.electron
            .modifySettings('settings', 'season', currentSeasonLocal)
            .then(function () {
            setCurrentSeason(currentSeasonLocal);
            if (!seasonValues.every(function (_a) {
                var season = _a.season;
                return season !== currentSeasonLocal;
            })) {
                console.error('New season cannot be duplicate of existing season');
                return;
            }
            else if (currentSeasonLocal === '') {
                console.error('New season cannot be empty string');
                return;
            }
            else {
                (0, CRUD_1.createDatabaseEntry)('INSERT INTO seasons (season) VALUES (?)', [currentSeasonLocal], function (_a) {
                    var error = _a.error;
                    if (error)
                        console.error(error);
                    else {
                        react_hot_toast_1.toast.success('New season created successfully!');
                        (0, CRUD_1.readDatabaseEntry)('SELECT * FROM seasons', null, function (_a) {
                            var error = _a.error, result = _a.result;
                            if (error)
                                console.error(error);
                            else
                                setSeasonValues(result);
                        });
                    }
                });
            }
        })["catch"](function (error) {
            react_hot_toast_1.toast.error(error.message);
            console.error(error);
        });
    };
    return (<div className='p-4'>
      <h1 id='settings-page' className='text-xl font-bold tracking-tight'>
        Settings page
      </h1>
      <p>
        Select an existing season or create a new season. Current season:{' '}
        <span className='font-bold'>{currentSeason}</span>
      </p>
      <div className='mb-4'>
        <label htmlFor='salutation' className='form-label mb-2 inline-block font-medium capitalize text-gray-700'>
          Existing Season
        </label>
        <microComponents_1.Selector options={seasonValues.map(function (_a) {
        var season = _a.season;
        return ({ k: season, v: season });
    })} selected={currentSeasonLocal} onChange={function (event) { return setCurrentSeasonLocal(event.target.value); }} onBlur={function () { return updateSeason(); }}/>
        <div className='mb-4'>
          <label htmlFor='newSeason' className='form-label mb-2 inline-block font-medium capitalize text-gray-700'>
            New Season
          </label>
          <input type='text' className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' placeholder='Internship 2022' name='newSeason' id='newSeason' value={currentSeasonLocal} onChange={function (event) { return setCurrentSeasonLocal(event.target.value); }} onBlur={function () { return createSeason(); }}/>
        </div>
      </div>
    </div>);
};
exports["default"] = SettingsPage;
//# sourceMappingURL=SettingsPage.js.map