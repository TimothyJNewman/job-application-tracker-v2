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
  new ObjectsToCsv(arrayOfObjects).toDisk(saveCsvPath);
  return path.join('output_files/csv_files', `applications_${fileName}.csv`);
};

module.exports = { exportToCsv };
