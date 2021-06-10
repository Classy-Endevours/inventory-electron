/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { getAllSupplierGraph } from '../../../components/Dashboard/reducer';

const PieGraph = () => {
  const {
    isLoading,
    isError,
    data: items,
  } = useSelector((state) => state.DashboardReducer.allSuppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSupplierGraph());
  }, []);

  const config = {
    statistic: {
      title: false,
    },
    appendPadding: 10,
    data: items,
    angleField: 'totalCount',
    colorField: 'name',
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
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <Paragraph>Some error occured while loading the graph</Paragraph>;
  }
  return <Pie {...config} />;
};

export default PieGraph;
