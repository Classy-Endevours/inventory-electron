/* eslint-disable react/prop-types */
import React from 'react';
import { ColorerdTable } from '../../uielements/Collection.style';

const TotalPlate = ({ data }) => {
  const columns = [
    {
      title: 'Item name',
      dataIndex: 'name',
    },
    {
      title: 'Sales(delivery)',
      dataIndex: 'sales',
    },
    {
      title: 'Earned(rs)',
      dataIndex: 'earn',
    },
    {
      title: 'Investment(rs)',
      dataIndex: 'invest',
    },
    {
      title: 'Iteration',
      dataIndex: 'iteration',
    },
  ];
  return (
    <ColorerdTable pagination={false} columns={columns} dataSource={data} />
  );
};

export default TotalPlate;
