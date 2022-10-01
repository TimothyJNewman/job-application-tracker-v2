const ObjectsToCsv = require('objects-to-csv');
const { app } = require('electron');
const path = require('path');

const exportToCsv = (event, arrayOfObjects) => {
  const fileName = new Date().toISOString().split(/[:.-]/).join('_');
  const saveCsvPath = path.join(
    app.getPath('userData'),
    'output_files/csv_files',
    `applications_${fileName}.csv`
  );
  return new ObjectsToCsv(arrayOfObjects).toDisk(saveCsvPath);
};

module.exports = { exportToCsv };
