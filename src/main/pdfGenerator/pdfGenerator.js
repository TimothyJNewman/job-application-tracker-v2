const latex = require('node-latex')
const fs = require('fs')
const { app } = require('electron')
const path = require('path')
const Readable = require('stream').Readable
const getLatex = require('../../main/pdfGenerator/templates/template1')

// Handler for get pdf request
const pdfGeneratorHandler = async (event, args) => {
  console.log(`Message received at main process: Latex params with id ${args.id}`)
  const latexString = getLatex(args)
  const pdf = await latex(latexString)

  // save pdf file
  try {
    const output = fs.createWriteStream(
      path.join(app.getPath("userData"), 'output_files/pdf_files', `output${args.id}.pdf`)
    )
    pdf.pipe(output)
  } catch (err) {
    throw new Error(err)
  }
  // save tex file
  try {
    const input = fs.createWriteStream(
      path.join(app.getPath("userData"), 'output_files/tex_files', `input${args.id}.tex`)
    )
    Readable.from(latexString).pipe(input)
  } catch (err) {
    throw new Error(err)
  }

  return new Promise((resolve, reject) => {
    pdf.on('error', (err) => reject(err))
    pdf.on('finish', resolve(`atom://${app.getPath("userData")}\\input${args.id}.pdf`))
  })
}

module.exports = pdfGeneratorHandler
