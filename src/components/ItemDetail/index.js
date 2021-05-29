/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Line } from '@ant-design/charts';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import TotalPlate from '../../common/components/dashboard/TotalPlate';

const itemData = {
  name: 'Clorian',
  total: [
    {
      sales: 100,
      name: 'Clorian',
      earn: 10000,
      invest: 12000,
      iteration: 10,
    },
    {
      sales: 400,
      name: 'fluton',
      earn: 4000,
      invest: 2000,
      iteration: 2,
    },
  ],
  data: [
    { month: 'Jan', name: 'Clorian', value: 100 },
    { month: 'Jan', name: 'fluton', value: 50 },
    { month: 'Feb', name: 'fluton', value: 150 },
    { month: 'Mar', name: 'fluton', value: 0 },
    { month: 'Apr', name: 'fluton', value: 0 },
    { month: 'May', name: 'fluton', value: 0 },
    { month: 'Feb', name: 'Clorian', value: 200 },
    { month: 'Mar', name: 'Clorian', value: 300 },
    { month: 'Apr', name: 'Clorian', value: 140 },
    { month: 'May', name: 'Clorian', value: 10 },
    { month: 'Jun', name: 'Clorian', value: 200 },
    { month: 'July', name: 'Clorian', value: 110 },
  ],
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Paragraph>Last Week</Paragraph>
    </Menu.Item>
    <Menu.Item key="2">
      <Paragraph>Last Month</Paragraph>
    </Menu.Item>
    <Menu.Item key="3">
      <Paragraph>Last Year</Paragraph>
    </Menu.Item>
  </Menu>
);

const ItemDetails = () => {
  const [data] = useState(itemData.data);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',
    // yAxis: {
    //   label: {
    //     formatter: function formatter(v) {
    //       return ''.concat((v / 1000000000).toFixed(1), ' B');
    //     },
    //   },
    // },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return (
    <Col>
      <Row align="center" justify="space-between">
        <Title level={2}>{itemData.name}</Title>
        <Dropdown overlay={menu} trigger={['click']}>
          <Title
            level={5}
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            Filter <DownOutlined />
          </Title>
        </Dropdown>
      </Row>
      <Line {...config} />
      <br />
      <TotalPlate data={itemData.total} />
    </Col>
  );
};

export default ItemDetails;
