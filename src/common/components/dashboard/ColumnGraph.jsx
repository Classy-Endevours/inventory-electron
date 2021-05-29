/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Column } from '@ant-design/charts';

const ColumnGraph = () => {
  const data = [
    {
      name: 'Inventory In',
      date: 'Jan',
      value: 100,
    },
    {
      name: 'Inventory Out',
      date: 'Jan',
      value: 50,
    },
    {
      name: 'Inventory In',
      date: 'Feb',
      value: 100,
    },
    {
      name: 'Inventory Out',
      date: 'Feb',
      value: 10,
    },
    {
      name: 'Inventory In',
      date: 'Mar',
      value: 10,
    },
    {
      name: 'Inventory Out',
      date: 'Mar',
      value: 50,
    },
    {
      name: 'Inventory In',
      date: 'Apr',
      value: 100,
    },
    {
      name: 'Inventory Out',
      date: 'Apr',
      value: 50,
    },
    {
      name: 'Inventory In',
      date: 'May',
      value: 40,
    },
    {
      name: 'Inventory Out',
      date: 'May',
      value: 100,
    },
    {
      name: 'Inventory In',
      date: 'Jun',
      value: 100,
    },
    {
      name: 'Inventory Out',
      date: 'Jun',
      value: 50,
    },
    {
      name: 'Inventory In',
      date: 'July',
      value: 17,
    },
    {
      name: 'Inventory Out',
      date: 'July',
      value: 50,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };
  return <Column {...config} />;
};

export default ColumnGraph;
