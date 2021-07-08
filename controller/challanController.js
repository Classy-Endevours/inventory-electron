const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const { challan, items, inventoryOut, vendor, settings } = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

ipcMain.on('challan-create-message', async (event, arg) => {
  try {
    const item = await challan.create(arg);
    if (item !== null) {
      event.reply(
        'challan-create-reply',
        response.success('Challan Saved successfully', item),
      );
    } else {
      const err = new Error('Challan saving failed');
      throw err;
    }
  } catch (error) {
    console.log({ error });
    event.reply('challan-create-reply', response.error(error.message));
  }
});

ipcMain.on('challan-fetch-message', async (event, arg) => {
  try {
    const options = {
      order: [['updatedAt', 'DESC']],
    };
    if (arg?.where) options.where = arg.where;
    if (arg?.offset) {
      options.offset = arg.offset;
      options.limit = 15;
    }
    options.include = [
      items,
      {
        model: inventoryOut,
        include: [vendor],
      },
      settings,
    ];
    options.raw = true;
    options.nest = true;
    const item = await challan.findAll(options);
    if (item.length > 0) {
      event.reply(
        'challan-fetch-reply',
        response.success('Challan Found successfully', {
          challan: item,
        }),
      );
    } else {
      const err = new Error('No Challans In Found');
      throw err;
    }
  } catch (error) {
    console.log({ error });
    event.reply('challan-fetch-reply', response.error(error.message));
  }
});

ipcMain.on('challan-update-message', async (event, arg) => {
  try {
    const options = {};
    if (arg.where) options.where = arg.where;

    const item = await challan.update(arg.values, options);
    if (item.length > 0) {
      event.reply(
        'challan-update-reply',
        response.success('Challan Updated successfully', item),
      );
    } else {
      const err = new Error('No challan Updated');
      throw err;
    }
  } catch (error) {
    event.reply('challan-update-reply', response.error(error.message));
  }
});
