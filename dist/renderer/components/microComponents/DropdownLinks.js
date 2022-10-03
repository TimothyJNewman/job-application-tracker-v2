"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
var DropdownLinks = function (_a) {
    var _b = _a.values, values = _b === void 0 ? [] : _b, className = _a.className;
    return (<div className={"flex justify-center ".concat(className)}>
      <div className='dropdown relative'>
        <span className='dropdown-toggle flex cursor-pointer items-center justify-center whitespace-nowrap rounded bg-blue-600 px-2 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white active:shadow-lg' id='dropdownMenuButton2' data-bs-toggle='dropdown' aria-expanded='false' data-mdb-ripple='true' data-mdb-ripple-color='light'>
          <react_bootstrap_icons_1.ArrowUpRightSquare className='mr-1'/>
          Open
        </span>
        <ul className=' dropdown-menu absolute z-50 float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left text-base shadow-lg' aria-labelledby='dropdownMenuButton2'>
          {values.map(function (_a) {
            var label = _a.label, link = _a.link;
            return (<li key={link}>
              <react_router_dom_1.Link className='dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-blue-800' to={link}>
                {label}
              </react_router_dom_1.Link>
            </li>);
        })}
        </ul>
      </div>
    </div>);
};
exports["default"] = DropdownLinks;
//# sourceMappingURL=DropdownLinks.js.map