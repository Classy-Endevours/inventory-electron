/* eslint-disable react/prop-types */
import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import {
  BorderedCard,
  DividerWithlessMargin,
} from '../../uielements/Collection.style';

const DashboardCard = ({ headingText, mainText, middleText, bottomText }) => {
  return (
    <BorderedCard>
      <Col>{headingText}</Col>
      <Col>
        {' '}
        <Title level={4}>{mainText}</Title>{' '}
      </Col>
      {middleText && <Col>{middleText}</Col>}
      <DividerWithlessMargin />
      <Col>{bottomText}</Col>
    </BorderedCard>
  );
};

export default DashboardCard;
