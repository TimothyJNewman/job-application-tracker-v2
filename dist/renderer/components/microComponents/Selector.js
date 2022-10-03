"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Selector = function (_a) {
    var options = _a.options, selected = _a.selected, onChange = _a.onChange, onBlur = _a.onBlur, title = _a.title, style = _a.style;
    return (<div className='min-w-[12rem] xl:max-w-[96rem]'>
    <select onChange={onChange} onBlur={onBlur} title={title} style={style} className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none' aria-label='Default select example'>
      {options.map(function (_a) {
            var k = _a.k, v = _a.v;
            return (<option key={k} selected={k === selected} value={k}>
          {v}
        </option>);
        })}
    </select>
  </div>);
};
exports["default"] = Selector;
//# sourceMappingURL=Selector.js.map