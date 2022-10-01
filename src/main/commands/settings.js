const Store = require('electron-store');

const store = new Store();

const getConfig = (key) => {
  return store.get(key);
};

const setConfig = (key, value) => {
  store.set(key, value);
  return { key, value };
};

/**
 * Calls getConfig if value does not exist and setConfig otherwise
 * @param {*} event
 * @param {*} key
 * @param {*} value
 * @returns
 */
const configManagement = (event, key, value) => {
  if (value === undefined) {
    return getConfig(key);
  } else {
    return setConfig(key, value);
  }
};

module.exports = { configManagement };
