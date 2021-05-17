const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const isDev = require('electron-is-dev');

const config = isDev
  ? require('../config/config')[env]
  : require(`${path.join(__dirname, '', '../config/config.js')}`)[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}
const migrations = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../migrations'),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize, // here should be a sequelize instance, not the Sequelize module
  },
  logger: console,
});
const seeders = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, '../seeders'),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize, // here should be a sequelize instance, not the Sequelize module
  },
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  try {
    await migrations.up();
    await seeders.up();
  } catch (error) {
    console.log(error);
  }
})();
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
