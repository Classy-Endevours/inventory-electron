const { getDocumentsFolder } = require('platform-folders');

const documents = getDocumentsFolder();
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: `${documents}/inventoryDevelopment.sqlite3`,
    query: { raw: true },
  },
  test: {
    dialect: 'sqlite',
    storage: `${documents}/inventoryTest.sqlite3`,
    query: { raw: true },
  },
  production: {
    dialect: 'sqlite',
    storage: `${documents}/inventoryProduction.sqlite3`,
    query: { raw: true },
  },
};
