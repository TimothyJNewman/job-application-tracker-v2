const createDatabaseEntry = (sql, params, callback = () => {}) => {
  window.electron
    .database('database', 'POST', sql, params)
    .then((result) => callback({ error: null, result }))
    .catch((error) => callback({ error, result: null }));
};

const readDatabaseEntry = (sql, params, callback = () => {}) => {
  window.electron
    .database('database', 'GET', sql, params)
    .then((result) => callback({ error: null, result }))
    .catch((error) => callback({ error, result: null }));
};

const updateDatabaseEntry = (sql, params, callback = () => {}) => {
  window.electron
    .database('database', 'PUT', sql, params)
    .then((result) => callback({ error: null, result }))
    .catch((error) => callback({ error, result: null }));
};

const deleteDatabaseEntry = (sql, params, callback = () => {}) => {
  window.electron
    .database('database', 'DELETE', sql, params)
    .then((result) => callback({ error: null, result }))
    .catch((error) => callback({ error, result: null }));
};

export {
  createDatabaseEntry,
  readDatabaseEntry,
  updateDatabaseEntry,
  deleteDatabaseEntry,
};
