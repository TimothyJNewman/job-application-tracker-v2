const latex = require('node-latex');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { app } = require('electron');
const path = require('path');
const {getLetterLatex} = require('./templates/letter_template2');
const {getCVLatex} = require('./templates/template2');

/**
 * Function to generate and save pdf given latexString and id
 * @param {string} latexString
 * @param {number} id
 * @returns {Promise}
 */
const pdfGenerator = async (latexString, type, id) => {
  let latexPdf;

  latexPdf = await latex(latexString);

  // Check for existing files and delete existing file
  const pdfFiles = await fsPromises.readdir(
    path.join(app.getPath('userData'), `output_files/${type}_pdf`)
  );
  const existingPdfFile = pdfFiles.find((file) => {
    const pattern = new RegExp(type + '_' + id);
    return pattern.test(file);
  });
  if (existingPdfFile !== undefined) {
    await fsPromises.unlink(
      path.join(
        app.getPath('userData'),
        `output_files/${type}_pdf`,
        existingPdfFile
      )
    );
  }

  const texFiles = await fsPromises.readdir(
    path.join(app.getPath('userData'), `output_files/${type}_tex`)
  );
  const existingTexFile = texFiles.find((file) => {
    const pattern = new RegExp(type + '_' + id);
    return pattern.test(file);
  });
  if (existingTexFile !== undefined) {
    await fsPromises.unlink(
      path.join(
        app.getPath('userData'),
        `output_files/${type}_tex`,
        existingTexFile
      )
    );
  }

  // save pdf file
  const dateString = new Date().toISOString().split(/[:.-]/).join('_');
  const pdfFile = new Promise((resolve, reject) => {
    const savePdfPath = path.join(
      app.getPath('userData'),
      `output_files/${type}_pdf`,
      `${type}_${id}_${dateString}.pdf`
    );
    const output = fs.createWriteStream(savePdfPath);
    latexPdf.pipe(output);
    latexPdf.on('error', (err) => reject(err));
    latexPdf.on('finish', () =>
      resolve(`\\output_files\\${type}_pdf\\${type}_${id}_${dateString}.pdf`)
    );
  });

  // save tex file
  const saveTexPath = path.join(
    app.getPath('userData'),
    `output_files/${type}_tex`,
    `${type}_${id}_${dateString}.tex`
  );
  const texFile = fsPromises.writeFile(saveTexPath, latexString);

  const returnArray = await Promise.all([pdfFile, texFile]);
  return returnArray[0];
};

const pdfGeneratorHandler = async (event, type, args) => {
  let latexString;
  if (type === 'cv') {
    latexString = getCVLatex(args.detailsObject);
  } else if (type === 'letter') {
    latexString = getLetterLatex(args.detailsObject);
  }
  return pdfGenerator(latexString, type, args.id);
};

module.exports = { pdfGeneratorHandler };
