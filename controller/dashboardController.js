/* eslint-disable import/no-dynamic-require */
const { ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const sequelize = require('sequelize');

const response = isDev
  ? require('../config/responseConfig')
  : require(`${path.join(__dirname, '', '../config/responseConfig')}`);
const { inventoryOut, items, inventoryIn, supplier } = isDev
  ? require('../models')
  : require(`${path.join(__dirname, '', '../models')}`);

ipcMain.on('report-items-fetch-message', async (event) => {
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
ipcMain.on('report-inventory-in-out-fetch-message', async (event) => {
  try {
    const outUtility = {
      options: {
        raw: true,
        // order: [['updatedAt', 'DESC']],
        nest: true,
      },
      lastWeek: {
        attributes: [
          'id',
          [sequelize.literal("'Inventory Out'"), 'name'],
          [
            sequelize.literal('strftime("%d-%m-%Y", inventoryOut.createdAt)'),
            'month_year',
          ],
          [sequelize.literal('SUM(quantity*rate)'), 'totalCount'],
        ],
        group: [
          sequelize.fn(
            'strftime',
            '%d-%m-%Y',
            sequelize.col('inventoryOut.createdAt'),
            // 'createdAt',
          ),
        ],
      },
    };
    const inUtility = {
      options: {
        raw: true,
        // order: [['updatedAt', 'DESC']],
        nest: true,
      },
      lastWeek: {
        attributes: [
          'id',
          [sequelize.literal("'Inventory In'"), 'name'],
          [
            sequelize.literal('strftime("%d-%m-%Y", inventoryIn.createdAt)'),
            'month_year',
          ],
          [sequelize.literal('SUM(quantity*rate)'), 'totalCount'],
        ],
        group: [
          sequelize.fn(
            'strftime',
            '%d-%m-%Y',
            sequelize.col('inventoryIn.createdAt'),
            // 'createdAt',
          ),
        ],
      },
    };
    const outItems = await inventoryOut.findAll({
      ...outUtility.options,
      ...outUtility.lastWeek,
    });
    const inItems = await inventoryIn.findAll({
      ...inUtility.options,
      ...inUtility.lastWeek,
    });
    const data = outItems.concat(inItems);
    event.reply(
      'report-inventory-in-out-fetch-reply',
      response.success('Items Found successfully', {
        data,
      }),
    );
  } catch (error) {
    event.reply(
      'report-inventory-in-out-fetch-reply',
      response.error(error.message),
    );
  }
});
ipcMain.on('report-all-suppliers', async (event) => {
  try {
    const utility = {
      options: {
        raw: true,
        order: [['updatedAt', 'DESC']],
        nest: true,
        include: [inventoryIn],
      },
      lastWeek: {
        attributes: [
          'id',
          'name',
          [
            sequelize.literal('SUM(inventoryIns.quantity*inventoryIns.rate)'),
            'totalCount',
          ],
        ],
        group: ['supplier.id'],
      },
    };
    const suppliers = await supplier.findAll({
      ...utility.options,
      ...utility.lastWeek,
    });
    event.reply(
      'report-all-suppliers-reply',
      response.success('Items Found successfully', {
        data: suppliers,
      }),
    );
  } catch (error) {
    event.reply('report-all-suppliers-reply', response.error(error.message));
  }
});
