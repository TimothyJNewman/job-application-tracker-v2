"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Switch = function (_a) {
    var isChecked = _a.isChecked, setIsChecked = _a.setIsChecked, id = _a.id, name = _a.name, label = _a.label;
    if (id == undefined)
        name = id;
    return (<div className='form-check form-switch'>
      <input className='form-check-input float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-white bg-gray-300 bg-contain bg-no-repeat align-top shadow-sm focus:outline-none' id={id} name={name} checked={isChecked} onChange={function () { return setIsChecked(!isChecked); }} type='checkbox' role='switch'/>
      {label != null && (<label className='form-check-label inline-block text-gray-800' htmlFor={id}>
          {label}
        </label>)}
    </div>);
};
exports["default"] = Switch;
//# sourceMappingURL=Switch.js.map