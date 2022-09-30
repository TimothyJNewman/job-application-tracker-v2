const Database = require('better-sqlite3');
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

// using better-sqlite3
const databaseInit = () => {
  // create database directory if does not exist
  const databaseDir = path.join(app.getPath('userData'), 'database');
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir);
  }

  let db;
  try {
    db = new Database(
      path.join(app.getPath('userData'), 'database', 'db.sqlite3')
    );
  } catch (error) {
    if (error) console.error('Database opening error: ', error);
  }

  db.transaction(() => {
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      season VARCHAR(63)
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company VARCHAR(127) NOT NULL,
      role TEXT,
      job_description TEXT,
      is_open INTEGER NOT NULL DEFAULT 0 CHECK(is_open IN (0,1)),
      status VARCHAR(63),
      cv_url TEXT,
      cover_letter_url TEXT,
      job_description_url TEXT,
      link TEXT,
      date_applied DATE,
      date_created DATE,
      date_modified DATE
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS cv_component_in_application (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER NOT NULL,
      component_id INTEGER NOT NULL,
      FOREIGN KEY (application_id) REFERENCES applications (id),
      FOREIGN KEY (component_id) REFERENCES cv_components (id)
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS cv_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cv_component_section VARCHAR(127) NOT NULL,
      cv_component_text TEXT,
      cv_component_description TEXT,
      date_created DATE,
      date_modified DATE
    )
  `
    ).run();
  })();
};

/**
 * Handler for database request
 */
const databaseHandler = (event, commandVerb, sql, params) => {
  // using better-sqlite3
  let db;
  try {
    db = new Database(
      path.join(app.getPath('userData'), 'database', 'db.sqlite3'),
      { verbose: console.log }
    );
  } catch (error) {
    if (error) console.error('Database opening error: ', error);
  }
  if (
    commandVerb === 'POST' ||
    commandVerb === 'PUT' ||
    commandVerb === 'DELETE'
  ) {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(() => db.prepare(sql).run(params))();
        resolve(`${commandVerb} command is successful`);
      } catch (error) {
        reject(error);
        throw error;
      }
    });
  } else if (commandVerb === 'GET') {
    return new Promise((resolve, reject) => {
      try {
        db.transaction(() => {
          let rows;
          if (params) {
            rows = db.prepare(sql).all(params);
          } else {
            rows = db.prepare(sql).all();
          }
          resolve(rows);
        })();
      } catch (error) {
        reject(error);
        throw error;
      }
    });
  }
};

module.exports = { databaseInit, databaseHandler };
