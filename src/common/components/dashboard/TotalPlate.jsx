/* eslint-disable react/prop-types */
import React from 'react';
import { ColorerdTable } from '../../uielements/Collection.style';

const TotalPlate = ({ data }) => {
  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
    },
    {
      title: 'Earned',
      dataIndex: 'earn',
    },
    {
      title: 'Investment',
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
