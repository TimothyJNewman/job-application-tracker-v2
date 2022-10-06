const { shell } = require('electron');
const path = require('path');

/**
 * Function to open path in file explorer
 * @param {Object} event
 * @param {string} uri
 */
const openFolder = (event, uri) => {
  const parsedPath = path.parse(uri);
  if (parsedPath.ext === 'pdf') {
    shell.openPath('folderpath'); // Open the given file in the desktop's default manner.
  } else {
    shell.showItemInFolder(uri); // Show the given file in a file manager. If possible, select the file.
  }
};

module.exports = { openFolder };
