const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const moment = require('moment');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const { inventoryOut, items, vendor } = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

ipcMain.on('report-items-fetch-message', async (event, arg) => {
  try {
    const utility = {
      options: {
        // limit: 4,
        include: [
          {
            model: items,
            attributes: ['productName'],
          },
        ],
        raw: true,
        order: [['updatedAt', 'DESC']],
        nest: true,
      },
      lastWeek: {
        attributes: [
          'id',
          [
            sequelize.literal('strftime("%d-%m-%Y", inventoryOut.createdAt)'),
            'month_year',
          ],
          [sequelize.literal('SUM(quantity*rate)'), 'totalOutEarns'],
        ],
        group: [
          sequelize.fn(
            'strftime',
            '%d-%m-%Y',
            sequelize.col('inventoryOut.createdAt'),
            // 'createdAt',
          ),
          'item.id',
        ],
        // where: {
        //   createdAt: {
        //     [Op.gte]: moment().subtract(7, 'days').toDate(),
        //     [Op.lte]: moment().subtract(0, 'days').toDate(),
        //   },
        // },
        order: [[sequelize.literal('month_year'), 'DESC']],
      },
    };
    const mostOutItems = await inventoryOut.findAll({
      ...utility.options,
      ...utility.lastWeek,
    });
    if (mostOutItems.length > 0) {
      event.reply(
        'report-items-fetch-reply',
        response.success('Items Found successfully', {
          mostOutItems,
        }),
      );
    } else {
      const err = new Error('No Items Found');
      throw err;
    }
  } catch (error) {
    event.reply('report-items-fetch-reply', response.error(error.message));
  }
});
