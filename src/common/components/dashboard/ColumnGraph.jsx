/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@ant-design/charts';
import { Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { getColumnGraph } from '../../../components/Dashboard/reducer';

const ColumnGraph = () => {
  const {
    isLoading,
    isError,
    data: items,
  } = useSelector((state) => state.DashboardReducer.columnGraph);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColumnGraph());
  }, []);
  const config = {
    data: items,
    isGroup: true,
    xField: 'month_year',
    yField: 'totalCount',
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
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <Paragraph>Some error occured while loading the graph</Paragraph>;
  }
  return <Column {...config} />;
};

export default ColumnGraph;
