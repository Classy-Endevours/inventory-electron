import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from '@ant-design/charts';
import { Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { getLineGraph } from '../../../components/Dashboard/reducer';

const DemoLine = () => {
  const { isLoading, isError, data: items } = useSelector(
    (state) => state.DashboardReducer.lineGraph,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    dispatch(getLineGraph());
  }, []);
  const config = {
    data: items,
    xField: 'month_year',
    yField: 'totalOutEarns',
    seriesField: 'productName',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1).toFixed(1), ' rs');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <Paragraph>Some error occured while loading the graph</Paragraph>;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Line {...config} />;
};

export default DemoLine;
