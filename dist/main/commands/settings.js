var Store = require('electron-store');
var store = new Store();
var getConfig = function (key) {
    return store.get(key);
};
var setConfig = function (key, value) {
    store.set(key, value);
    return { key: key, value: value };
};
/**
 * Calls getConfig if value does not exist and setConfig otherwise
 * @param {*} event
 * @param {*} key
 * @param {*} value
 * @returns
 */
var configManagement = function (event, key, value) {
    if (value === undefined) {
        return getConfig(key);
    }
    else {
        return setConfig(key, value);
    }
};
module.exports = { configManagement: configManagement };
//# sourceMappingURL=settings.js.map