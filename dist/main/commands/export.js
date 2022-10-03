var ObjectsToCsv = require('objects-to-csv');
var app = require('electron').app;
var path = require('path');
var exportToCsv = function (event, arrayOfObjects) {
    var fileName = new Date().toISOString().split(/[:.-]/).join('_');
    var saveCsvPath = path.join(app.getPath('userData'), 'output_files/csv_files', "applications_".concat(fileName, ".csv"));
    return new ObjectsToCsv(arrayOfObjects).toDisk(saveCsvPath);
};
module.exports = { exportToCsv: exportToCsv };
//# sourceMappingURL=export.js.map