/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Pie } from '@ant-design/charts';

const PieGraph = () => {
  const data = [
    {
      type: 'Piyush',
      value: 27,
    },
    {
      type: 'Pushpak',
      value: 25,
    },
    {
      type: 'Vikash',
      value: 18,
    },
    {
      type: 'Ankur',
      value: 15,
    },
    {
      type: 'Manthan',
      value: 10,
    },
    {
      type: 'Vijay',
      value: 5,
    },
  ];

  const config = {
    statistic: {
      title: false,
    },
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      type: {
        alias: 'Quantity',
        range: [0, 1],
      },
      value: {
        formatter: function formatter(v) {
          return ''.concat('Total ', v);
        },
      },
    },
    label: {
      type: 'inner',
      title: 'as',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };
  return <Pie {...config} />;
};

export default PieGraph;
