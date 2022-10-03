"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button = function (_a) {
    var Icon = _a.Icon, _b = _a.color, color = _b === void 0 ? 'blue' : _b, _c = _a.additionalAttributes, additionalAttributes = _c === void 0 ? {} : _c, value = _a.value, onClick = _a.onClick;
    return (<button type='button' onClick={onClick} data-mdb-ripple='true' data-mdb-ripple-color='light' {...additionalAttributes} className={"align-center ml-auto inline-flex rounded bg-".concat(color, "-600 px-4 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-").concat(color, "-700 hover:shadow-lg focus:bg-").concat(color, "-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-").concat(color, "-800 active:shadow-lg")}>
    {Icon && <Icon className='mr-2 h-4 w-4'/>}
    {value}
  </button>);
};
exports["default"] = Button;
//# sourceMappingURL=Button.js.map