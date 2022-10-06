const fs = require('fs/promises');
const path = require('path');
const { app } = require('electron');

/**
 * Function to read upload pdf and save this pdf in output files
 * @param {Object} event
 * @param {Object} args
 * @param {number} args.applicationID
 * @param {string} args.uploadPdfUrl
 * @param {string} args.type
 */
const saveCVOrLetterPdf = async (
  event,
  { applicationID, uploadPdfUrl, type }
) => {
  // Check for existing files and delete existing file
  const pdfFiles = await fs.readdir(
    path.join(app.getPath('userData'), `output_files/${type}_pdf`)
  );
  const existingPdfFile = pdfFiles.find((file) => {
    const pattern = new RegExp(type + '_' + applicationID);
    return pattern.test(file);
  });
  if (existingPdfFile !== undefined) {
    await fs.unlink(
      path.join(
        app.getPath('userData'),
        `output_files/${type}_pdf`,
        existingPdfFile
      )
    );
  }

  // save PDF
  const uploadedPdfBuffer = await fs.readFile(uploadPdfUrl);
  const fileName = `${type}_${applicationID}_${new Date()
    .toISOString()
    .split(/[:.-]/)
    .join('_')}.pdf`;
  const savePdfFile = path.join(
    app.getPath('userData'),
    `output_files/${type}_pdf`,
    fileName
  );
  await fs.writeFile(savePdfFile, uploadedPdfBuffer);
  return `\\output_files\\${type}_pdf\\${fileName}`;
};

/**
 * Function to read upload pdf and save this pdf in output files
 * @param {Object} event
 * @param {Object} args
 * @param {number} args.applicationID
 * @param {string} args.uploadPdfUrl
 */
const saveJobDescription = async (event, { applicationID, uploadPdfUrl }) => {
  // Check for existing files and delete existing file
  const pdfFiles = await fs.readdir(
    path.join(app.getPath('userData'), 'output_files/job_desc_files')
  );
  const existingPdfFile = pdfFiles.find((file) => {
    const pattern = new RegExp('job_desc_' + applicationID);
    return pattern.test(file);
  });
  if (existingPdfFile !== undefined) {
    await fs.unlink(
      path.join(
        app.getPath('userData'),
        'output_files/job_desc_files',
        existingPdfFile
      )
    );
  }

  // Save Job Desc PDF
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

/**
 * Function to save PDFs of different types
 * @param {Object} event
 * @param {Object} args
 * @param {number} args.applicationID
 * @param {string} args.uploadPdfUrl
 * @param {string} args.type
 */
const savePdf = async (event, { applicationID, uploadPdfUrl, type }) => {
  if (type === 'cv' || type === 'letter')
    return saveCVOrLetterPdf(event, { applicationID, uploadPdfUrl, type });
  if (type === 'job_desc')
    return saveJobDescription(event, { applicationID, uploadPdfUrl });
  throw new Error(
    `File save type: ${type} not recongnised. Possible values are cv, letter, job_desc`
  );
};

module.exports = { savePdf, saveJobDescription };
