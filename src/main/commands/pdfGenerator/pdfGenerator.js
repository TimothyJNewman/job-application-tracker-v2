const latex = require('node-latex');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { app } = require('electron');
const path = require('path');
const Readable = require('stream').Readable;
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
      'output_files/pdf_files',
      `output${args.id}.pdf`
    );
    const output = fs.createWriteStream(savePdfPath);
    latexPdf.pipe(output);
    latexPdf.on('error', (err) => reject(err));
    latexPdf.on('finish', () => resolve(`\\pdf_files\\output${args.id}.pdf`));
  });

  // save tex file
  const saveTexPath = path.join(
    app.getPath('userData'),
    'output_files/tex_files',
    `input${args.id}.tex`
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
