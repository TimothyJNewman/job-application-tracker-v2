var app = require('electron').app;
var path = require('path');
var getUserDataPath = function () {
    return path.normalize(app.getPath('userData'));
};
module.exports = { getUserDataPath: getUserDataPath };
//# sourceMappingURL=getPaths.js.map