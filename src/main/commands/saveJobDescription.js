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
const saveJobDescription = async (event, { applicationID, uploadPdfUrl }) => {
  const uploadedPdfBuffer = await fs.readFile(uploadPdfUrl);
  const fileName = `job_desc_${applicationID}_${new Date()
    .toISOString()
    .split(/[:.-]/)
    .join('_')}.pdf`;
  const savePdfFile = path.join(
    app.getPath('userData'),
    'output_files/job_desc_files',
    fileName
  );
  await fs.writeFile(savePdfFile, uploadedPdfBuffer);
  return `\\output_files\\job_desc_files\\${fileName}`;
};

module.exports = { saveJobDescription };
