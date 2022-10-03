"use strict";
exports.__esModule = true;
exports.deleteDatabaseEntry = exports.updateDatabaseEntry = exports.readDatabaseEntry = exports.createDatabaseEntry = void 0;
var createDatabaseEntry = function (sql, params, callback) {
    if (callback === void 0) { callback = function () { }; }
    window.electron
        .database('database', 'POST', sql, params)
        .then(function (result) { return callback({ error: null, result: result }); })["catch"](function (error) { return callback({ error: error, result: null }); });
};
exports.createDatabaseEntry = createDatabaseEntry;
var readDatabaseEntry = function (sql, params, callback) {
    if (callback === void 0) { callback = function () { }; }
    window.electron
        .database('database', 'GET', sql, params)
        .then(function (result) { return callback({ error: null, result: result }); })["catch"](function (error) { return callback({ error: error, result: null }); });
};
exports.readDatabaseEntry = readDatabaseEntry;
var updateDatabaseEntry = function (sql, params, callback) {
    if (callback === void 0) { callback = function () { }; }
    window.electron
        .database('database', 'PUT', sql, params)
        .then(function (result) { return callback({ error: null, result: result }); })["catch"](function (error) { return callback({ error: error, result: null }); });
};
exports.updateDatabaseEntry = updateDatabaseEntry;
var deleteDatabaseEntry = function (sql, params, callback) {
    if (callback === void 0) { callback = function () { }; }
    window.electron
        .database('database', 'DELETE', sql, params)
        .then(function (result) { return callback({ error: null, result: result }); })["catch"](function (error) { return callback({ error: error, result: null }); });
};
exports.deleteDatabaseEntry = deleteDatabaseEntry;
//# sourceMappingURL=CRUD.js.map