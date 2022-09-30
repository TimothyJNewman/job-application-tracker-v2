const fs = require('fs/promises');
const path = require('path');
const { app } = require('electron');

/**
 * Function to read upload pdf and save this pdf in output files
 * @param {Object} event
 * @param {Object} args
 * @param {number} args.applicationID
 * @param {string} args.uploadPdfUrl
 */
const saveCV = async (event, { applicationID, uploadPdfUrl }) => {
  const uploadedPdfBuffer = await fs.readFile(uploadPdfUrl);

  const fileName = `cv_${applicationID}_${new Date().toISOString().split(/[:.-]/).join("_")}.pdf`
  const savePdfFile = path.join(
    app.getPath('userData'),
    'output_files/cv_pdf',
    fileName
  );
  await fs.writeFile(savePdfFile, uploadedPdfBuffer);
  return `\\output_files\\cv_pdf\\${fileName}`;
};

module.exports = { saveCV };
