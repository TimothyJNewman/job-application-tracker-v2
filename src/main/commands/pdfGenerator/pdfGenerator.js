const latex = require('node-latex');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { app } = require('electron');
const path = require('path');
const getLatex = require('./templates/template2');

/**
 * Handler for get pdf request
 */
const pdfGeneratorHandler = async (event, args) => {
  const latexString = getLatex(args.resumeObject);
  const latexPdf = await latex(latexString);

  // save pdf file
  const pdfFile = new Promise((resolve, reject) => {
    const savePdfPath = path.join(
      app.getPath('userData'),
      'output_files/cv_pdf',
      `cv_${args.id}.pdf`
    );
    const output = fs.createWriteStream(savePdfPath);
    latexPdf.pipe(output);
    latexPdf.on('error', (err) => reject(err));
    latexPdf.on('finish', () =>
      resolve(`\\output_files\\cv_pdf\\cv_${args.id}_${new Date().toISOString().split(/[:.-]/).join("_")}.pdf`)
    );
  });

  // save tex file
  const saveTexPath = path.join(
    app.getPath('userData'),
    'output_files/cv_tex',
    `cv_${args.id}_${new Date().toISOString().split(/[:.-]/).join("_")}.tex`
  );
  const texFile = fsPromises.writeFile(saveTexPath, latexString);

  try {
    const returnArray = await Promise.all([pdfFile, texFile]);
    console.log('Created file: ', returnArray[0]);
    return returnArray[0];
  } catch (error) {
    throw error;
  }
};

module.exports = pdfGeneratorHandler;
