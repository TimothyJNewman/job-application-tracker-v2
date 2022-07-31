const sqlite3 = require('sqlite3');
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

// sqlite3 downloaded using https://www.techiediaries.com/electron-data-persistence/
const databaseInit = () => {
  // create database directory if does not exist
  const databaseDir = path.join(app.getPath('userData'), 'database');
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir);
  }

  const db = new sqlite3.Database(
    path.join(app.getPath('userData'), 'database', 'db.sqlite3'),
    (err) => {
      if (err) console.error('Database opening error: ', err);
    }
  );

  db.serialize(function () {
    db.run(`
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      season VARCHAR(63)
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company VARCHAR(127) NOT NULL,
      role TEXT,
      job_description TEXT,
      status VARCHAR(63),
      cv_url TEXT,
      cover_letter_url TEXT,
      is_cv_ready TINYINT NOT NULL DEFAULT 0 CHECK(is_cv_ready IN (0,1)),
      date_applied DATE
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS cv_component_in_application (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER NOT NULL,
      component_id INTEGER NOT NULL,
      FOREIGN KEY (application_id) REFERENCES applications (id),
      FOREIGN KEY (component_id) REFERENCES cv_components (id)
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS cv_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cv_section VARCHAR(127) NOT NULL,
      cv_component_text TEXT,
      date_created DATE
    )
  `);
  });
  db.close();
};

// Handler for database request
const databaseHandler = (event, commandVerb, sql, params) => {
  // sqlite3 downloaded using https://www.techiediaries.com/electron-data-persistence/
  const db = new sqlite3.Database(
    path.join(app.getPath('userData'), 'database', 'db.sqlite3'),
    (err) => {
      if (err) console.error('Database opening error: ', err);
    }
  );
  if (
    commandVerb === 'POST' ||
    commandVerb === 'PUT' ||
    commandVerb === 'DELETE'
  ) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err && err.message) reject(err);
        else resolve(`${commandVerb} command is successful`);
      });
    });
  } else if (commandVerb === 'GET') {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err && err.message) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = { databaseInit, databaseHandler };
