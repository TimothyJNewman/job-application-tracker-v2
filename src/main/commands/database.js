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
      season VARCHAR(63) NOT NULL UNIQUE
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company VARCHAR(127),
      role TEXT,
      job_description TEXT,
      is_open INTEGER NOT NULL DEFAULT 0 CHECK(is_open IN (0,1)),
      status VARCHAR(63) NOT NULL DEFAULT "To apply",
      cv_id INTEGER NOT NULL,
      letter_id INTEGER NOT NULL,
      job_description_url TEXT,
      location TEXT,
      deadline DATE,
      link TEXT,
      priority VARCHAR(63) NOT NULL DEFAULT "medium",
      date_created DATE,
      date_modified DATE,
      season_id INTEGER NOT NULL,
      FOREIGN KEY (cv_id) REFERENCES cv_list (id),
      FOREIGN KEY (letter_id) REFERENCES letter_list (id),
      FOREIGN KEY (season_id) REFERENCES seasons (id)
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS application_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id INTEGER NOT NULL,
      event_name VARCHAR(63),
      date_occurred DATE,
      FOREIGN KEY (application_id) REFERENCES applications (id)
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS cv_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section VARCHAR(127) NOT NULL,
      json TEXT,
      description TEXT
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS cv_component_link (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      component_id INTEGER NOT NULL,
      cv_id INTEGER NOT NULL,
      FOREIGN KEY (component_id) REFERENCES cv_components (id),
      FOREIGN KEY (cv_id) REFERENCES cv_list (id)
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS cv_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(511),
      cv_url TEXT
    )
  `
    ).run();
    db.prepare(
      `
    CREATE TABLE IF NOT EXISTS letter_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      letter_url TEXT,
      letter_json TEXT
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
