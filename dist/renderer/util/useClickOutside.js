"use strict";
// from https://www.30secondsofcode.org/react/s/use-click-outside
exports.__esModule = true;
var react_1 = require("react");
var useClickOutside = function (ref, outsideId, callback) {
    var handleClick = function (event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };
    (0, react_1.useEffect)(function () {
        var nodeRef = document.getElementById(outsideId);
        nodeRef.addEventListener('click', handleClick);
        return function () {
            nodeRef.removeEventListener('click', handleClick);
        };
    });
};
exports["default"] = useClickOutside;
//# sourceMappingURL=useClickOutside.js.map