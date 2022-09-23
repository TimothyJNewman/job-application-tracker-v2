const latex = require('node-latex');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { app } = require('electron');
const path = require('path');
const Readable = require('stream').Readable;
const getLatex = require('../../main/pdfGenerator/templates/template2');

// Handler for get pdf request
// const pdfGeneratorHandler = async (event, args) => {
//   console.log(args);
//   const latexString = getLatex(args);
//   const pdf = await latex(latexString);

//   // save pdf file
//   const pdfString = new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(
//       path.join(
//         app.getPath('userData'),
//         'output_files/pdf_files',
//         `output${args.id}.pdf`
//       )
//     );
//     pdf.pipe(output);
//     pdf.on('error', (err) => reject(err));
//     pdf.on('finish', () => {
//       const base64EncodedPdf = pdf2base64(
//         path.join(
//           app.getPath('userData'),
//           'output_files/pdf_files',
//           `output${args.id}.pdf`
//         )
//       );
//       base64EncodedPdf
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   });

//   // save tex file
//   const texFile = new Promise((resolve, reject) => {
//     const input = fs.createWriteStream(
//       path.join(
//         app.getPath('userData'),
//         'output_files/tex_files',
//         `input${args.id}.tex`
//       )
//     );
//     const latexReadable = Readable.from(latexString);
//     latexReadable.pipe(input);
//     latexReadable.on('error', (err) => reject(err));
//     latexReadable.on('data', () => resolve('Latex saved!'));
//   });

//   try {
//     const returnArray = await Promise.all([pdfString, texFile]);
//     return returnArray[0];
//   } catch (err) {
//     console.error(err);
//   }
// };

// Handler for get pdf request
const pdfGeneratorHandler = async (event, args) => {
  // console.log(args);
  const latexString = getLatex(args.resumeObject);
  const latexPdf = await latex(latexString);

  // // save pdf file
  // const pdfFile = async () => {
  //   const savePath = path.join(
  //     app.getPath('userData'),
  //     'output_files/pdf_files',
  //     `output${args.id}.pdf`
  //   )
  //   await fs.writeFile(savePath, latexPdf)
  //   return savePath
  // };

  // save pdf file
  const pdfFile = new Promise((resolve, reject) => {
    const savePdfPath = path.join(
      app.getPath('userData'),
      'output_files/pdf_files',
      `output${args.id}.pdf`
    )
    const output = fs.createWriteStream(savePdfPath);
    latexPdf.pipe(output);
    latexPdf.on('error', (err) => reject(err));
    latexPdf.on('finish', () => resolve(savePdfPath));
  });

  // save tex file
  const saveTexPath = path.join(
    app.getPath('userData'),
    'output_files/tex_files',
    `input${args.id}.tex`
  )
  const texFile = fsPromises.writeFile(saveTexPath, latexString);

  try {
    const returnArray = await Promise.all([pdfFile, texFile]);
    console.log("Created file: ",`atom://${returnArray[0]}`)
    return `atom://${returnArray[0]}`;
  } catch (err) {
    console.error(err);
  }
};

module.exports = pdfGeneratorHandler;
