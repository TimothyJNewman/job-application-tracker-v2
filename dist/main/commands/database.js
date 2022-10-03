var Database = require('better-sqlite3');
var app = require('electron').app;
var fs = require('fs');
var path = require('path');
// using better-sqlite3
var databaseInit = function () {
    // create database directory if does not exist
    var databaseDir = path.join(app.getPath('userData'), 'database');
    if (!fs.existsSync(databaseDir)) {
        fs.mkdirSync(databaseDir);
    }
    var db;
    try {
        db = new Database(path.join(app.getPath('userData'), 'database', 'db.sqlite3'));
    }
    catch (error) {
        if (error)
            console.error('Database opening error: ', error);
    }
    db.transaction(function () {
        db.prepare("\n    CREATE TABLE IF NOT EXISTS seasons (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      season VARCHAR(63) NOT NULL UNIQUE\n    )\n  ").run();
        db.prepare("\n    CREATE TABLE IF NOT EXISTS applications (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      company VARCHAR(127),\n      role TEXT,\n      job_description TEXT,\n      is_open INTEGER NOT NULL DEFAULT 0 CHECK(is_open IN (0,1)),\n      status VARCHAR(63) NOT NULL DEFAULT \"To apply\",\n      cv_url TEXT,\n      cover_letter_url TEXT,\n      cover_letter_json TEXT,\n      job_description_url TEXT,\n      link TEXT,\n      priority VARCHAR(63) NOT NULL DEFAULT \"medium\",\n      date_created DATE,\n      date_modified DATE,\n      season_id INTEGER NOT NULL,\n      FOREIGN KEY (season_id) REFERENCES seasons (id)\n    )\n  ").run();
        db.prepare("\n    CREATE TABLE IF NOT EXISTS application_events (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      application_id INTEGER NOT NULL,\n      event_name VARCHAR(63),\n      date_occurred DATE,\n      FOREIGN KEY (application_id) REFERENCES applications (id)\n    )\n  ").run();
        db.prepare("\n    CREATE TABLE IF NOT EXISTS cv_component_in_application (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      application_id INTEGER NOT NULL,\n      component_id INTEGER NOT NULL,\n      FOREIGN KEY (application_id) REFERENCES applications (id),\n      FOREIGN KEY (component_id) REFERENCES cv_components (id)\n    )\n  ").run();
        db.prepare("\n    CREATE TABLE IF NOT EXISTS cv_components (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      cv_component_section VARCHAR(127) NOT NULL,\n      cv_component_text TEXT,\n      cv_component_description TEXT,\n      date_created DATE,\n      date_modified DATE\n    )\n  ").run();
    })();
};
/**
 * Handler for database request
 */
var databaseHandler = function (event, commandVerb, sql, params) {
    // using better-sqlite3
    var db;
    try {
        db = new Database(path.join(app.getPath('userData'), 'database', 'db.sqlite3'), { verbose: console.log });
    }
    catch (error) {
        if (error)
            console.error('Database opening error: ', error);
    }
    if (commandVerb === 'POST' ||
        commandVerb === 'PUT' ||
        commandVerb === 'DELETE') {
        return new Promise(function (resolve, reject) {
            try {
                db.transaction(function () { return db.prepare(sql).run(params); })();
                resolve("".concat(commandVerb, " command is successful"));
            }
            catch (error) {
                reject(error);
                throw error;
            }
        });
    }
    else if (commandVerb === 'GET') {
        return new Promise(function (resolve, reject) {
            try {
                db.transaction(function () {
                    var rows;
                    if (params) {
                        rows = db.prepare(sql).all(params);
                    }
                    else {
                        rows = db.prepare(sql).all();
                    }
                    resolve(rows);
                })();
            }
            catch (error) {
                reject(error);
                throw error;
            }
        });
    }
};
module.exports = { databaseInit: databaseInit, databaseHandler: databaseHandler };
//# sourceMappingURL=database.js.map