const { app } = require('electron');
const path = require('path');

const getUserDataPath = () => {
  return path.normalize(app.getPath('userData'));
};

module.exports = { getUserDataPath };
