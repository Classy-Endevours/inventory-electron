const models = require('../../modelsyar');

const { users } = models;
const { ipcMain } = require('electron');

models.sequelize
  .sync()
  .then(() => console.log('Connected'))
  .catch((error) => console.log(error));

ipcMain.on('asynchronous-message', async (event) => {
  try {
    const create = await users.create({
      username: 'xyz',
      password: 'xyz',
    });
    const result = await users.findAll();
    event.reply('asynchronous-reply', result);
  } catch (error) {
    event.reply('asynchronous-reply', error && error.message);
  }
});
