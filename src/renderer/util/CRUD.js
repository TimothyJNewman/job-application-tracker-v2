const createDatabaseEntry = (sql, params, callback) => {
  window.electron
    .database('database', 'POST', sql, params)
    .then(callback)
    .catch((error) => console.log(`Database error: ${error}`))
}

const readDatabaseEntry = (sql, params, callback) => {
  window.electron
    .database('database', 'GET', sql, params)
    .then(callback)
    .catch((error) => console.log(`Database error: ${error}`))
}

const updateDatabaseEntry = (sql, params, callback) => {
  window.electron
    .database('database', 'PUT', sql, params)
    .then(callback)
    .catch((error) => console.log(`Database error: ${error}`))
}

const deleteDatabaseEntry = (sql, params, callback) => {
  window.electron
    .database('database', 'DELETE', sql, params)
    .then(callback)
    .catch((error) => console.log(`Database error: ${error}`))
}

export { createDatabaseEntry, readDatabaseEntry, updateDatabaseEntry, deleteDatabaseEntry }
