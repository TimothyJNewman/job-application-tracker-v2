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
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var CRUD_1 = require("../../util/CRUD");
var microComponents_1 = require("../../components/microComponents");
var GlobalContext_1 = require("../../context/GlobalContext");
var ApplicationDetails = function (_a) {
    var id = _a.id, appsData = _a.appsData, setAppsData = _a.setAppsData;
    var appDetails = appsData.find(function (elem) { return elem.id === id; });
    var _b = (0, react_1.useContext)(GlobalContext_1.GlobalContext), seasonValues = _b.seasonValues, currentSeason = _b.currentSeason;
    var updateValue = function (newValue, field) {
        if (field === 'company') {
            var newAppsData = appsData.map(function (elem) {
                if (elem.id === id)
                    return __assign(__assign({}, elem), { company: newValue });
                return elem;
            });
            setAppsData(newAppsData);
        }
        else if (field === 'role') {
            var newAppsData = appsData.map(function (elem) {
                if (elem.id === id)
                    return __assign(__assign({}, elem), { role: newValue });
                return elem;
            });
            setAppsData(newAppsData);
        }
        else if (field === 'status') {
            var newAppsData = appsData.map(function (elem) {
                if (elem.id === id)
                    return __assign(__assign({}, elem), { status: newValue });
                return elem;
            });
            setAppsData(newAppsData);
        }
        else if (field === 'link') {
            var newAppsData = appsData.map(function (elem) {
                if (elem.id === id)
                    return __assign(__assign({}, elem), { link: newValue });
                return elem;
            });
            setAppsData(newAppsData);
        }
    };
    var saveValue = function (field) {
        (0, CRUD_1.updateDatabaseEntry)("UPDATE applications SET ".concat(field, "=? WHERE id=?"), [appDetails[field], id], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
        });
    };
    var updateSeason = function (newValue) {
        var newAppsData = appsData.map(function (elem) {
            if (elem.id === id)
                return __assign(__assign({}, elem), { season: newValue });
            return elem;
        });
        setAppsData(newAppsData);
    };
    var saveSeason = function () {
        var _a;
        var seasonID = (_a = seasonValues.find(function (_a) {
            var season = _a.season;
            return season === appDetails.season;
        })) === null || _a === void 0 ? void 0 : _a.id;
        (0, CRUD_1.updateDatabaseEntry)("UPDATE applications SET season_id=? WHERE id=?", [seasonID, id], function (_a) {
            var error = _a.error;
            if (error)
                console.error(error);
        });
    };
    return (<div className='flex flex-col items-start gap-x-4 sm:flex-row'>
      <div className='flex w-fit justify-center pt-6 pb-2'>
        <div className='flex max-w-xl flex-row rounded bg-blue-50 shadow transition-colors duration-100 hover:bg-gray-50'>
          <div className='hidden w-full flex-col items-center justify-center gap-y-2 object-cover p-4 sm:flex'>
            {appDetails.status === 'Rejected' ? (<react_bootstrap_icons_1.EmojiFrown className='h-36 w-36'/>) : appDetails.status === 'Offer' ? (<react_bootstrap_icons_1.EmojiSmile className='h-36 w-36'/>) : appDetails.status === 'To apply' ? (<react_bootstrap_icons_1.EmojiSunglasses className='h-36 w-36'/>) : (<react_bootstrap_icons_1.EmojiNeutral className='h-36 w-36'/>)}
          </div>
          <div className='flex flex-col justify-start p-6'>
            <input className='bg-inherit p-1 text-xl font-medium text-gray-900 outline-blue-500' type='text' title='Company' placeholder='Company' value={appDetails.company} onChange={function (event) { return updateValue(event.target.value, 'company'); }} onBlur={function () { return saveValue('company'); }}/>
            <input className='bg-inherit p-1 text-base text-gray-700 outline-blue-500 hover:outline-blue-500' type='text' title='Role' placeholder='Role' value={appDetails.role} onChange={function (event) { return updateValue(event.target.value, 'role'); }} onBlur={function () { return saveValue('role'); }}/>
            <div className='flex items-center gap-x-2'>
              <input className='bg-inherit p-1 text-base text-gray-700 outline-blue-500' type='text' title='Link' placeholder='Link' value={appDetails.link} onChange={function (event) { return updateValue(event.target.value, 'link'); }} onBlur={function () { return saveValue('link'); }}/>
              <a target='_blank' href={appDetails.link} data-mdb-ripple='true' data-mdb-ripple-color='light' className='flex rounded bg-purple-600 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg'>
                <react_bootstrap_icons_1.ArrowUpRightSquare className='mr-1'/>
                Open
              </a>
              {/* <Button value="Open" Icon={ArrowUpRightSquare} color="purple" /> */}
            </div>
            <div>
              <microComponents_1.Selector options={[
            { k: 'To apply', v: 'To apply' },
            { k: 'Applied', v: 'Applied' },
            { k: 'Assessment', v: 'Assessment' },
            { k: 'Interview', v: 'Interview' },
            { k: 'Waiting for result', v: 'Waiting for result' },
            { k: 'Rejected', v: 'Rejected' },
            { k: 'Offer', v: 'Offer' },
        ]} title='Status' style={{
            backgroundColor: 'inherit',
            borderColor: 'transparent',
            padding: '0.25rem'
        }} selected={appDetails.status} onChange={function (event) { return updateValue(event.target.value, 'status'); }} onBlur={function () { return saveValue('status'); }}/>
            </div>
            <div>
              <microComponents_1.Selector options={[
            { k: 'low', v: 'Low' },
            { k: 'medium', v: 'Medium' },
            { k: 'high', v: 'High' },
        ]} title='Priority' style={{
            backgroundColor: 'inherit',
            borderColor: 'transparent',
            padding: '0.25rem'
        }} className='border-transparent bg-inherit p-0' selected={appDetails.priority} onChange={function (event) {
            return updateValue(event.target.value, 'priority');
        }} onBlur={function () { return saveValue('priority'); }}/>
            </div>
            <div className='mt-1 min-w-[12rem] px-1 text-xs text-gray-600'>
              Season:{' '}
              <select onChange={function (event) { return updateSeason(event.target.value); }} onBlur={function () { return saveSeason(); }} title='Season' className='bg-inherit' aria-label='Season selector'>
                {seasonValues
            .map(function (_a) {
            var season = _a.season;
            return ({ k: season, v: season });
        })
            .map(function (_a) {
            var k = _a.k, v = _a.v;
            return (<option key={k} selected={k === appDetails.season} value={k}>
                      {v}
                    </option>);
        })}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex w-full grow items-center'>
          <div className='accordion w-full' id='accordionJobDesc'>
            <div className='accordion-item border border-gray-200 bg-white'>
              <h2
                className='accordion-header mb-0'
                id='descriptionAccordionHeader'>
                <button
                  className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-5 text-left text-base text-gray-800 transition focus:outline-none'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#descriptionAccordion'
                  aria-expanded='false'
                  aria-controls='#descriptionAccordion'>
                  Full job description
                </button>
              </h2>
              <div
                id='descriptionAccordion'
                className='collapse accordion-collapse'
                aria-labelledby='descriptionAccordionHeader'
                data-bs-parent='#accordionJobDesc'>
                <div className='accordion-body w-full px-4 py-2'>
                  {appDetails.job_description}
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </div>);
};
exports["default"] = ApplicationDetails;
//# sourceMappingURL=ApplicationDetails.js.map