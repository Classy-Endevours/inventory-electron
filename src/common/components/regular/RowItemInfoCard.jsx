import {
  CheckCircleTwoTone,
  DownCircleTwoTone,
  UpCircleTwoTone,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

/* eslint-disable react/prop-types */
export const RowItemInfoCard = ({ item }) => {
  const getIcon = (score) => {
    switch (true) {
      case score > 0:
        return (
          <UpCircleTwoTone
            style={{ fontSize: '125%' }}
            twoToneColor="#52c41a"
          />
        );
      case score < 0:
        return (
          <DownCircleTwoTone
            style={{ fontSize: '125%' }}
            twoToneColor="#eb2f96"
          />
        );
      default:
        return <CheckCircleTwoTone style={{ fontSize: '125%' }} />;
    }
  };

  const getColor = (score) => {
    switch (true) {
      case score > 0:
        return '#52c41a';
      case score < 0:
        return '#eb2f96';
      default:
        return '#1890ff';
    }
  };

  return (
    <Row justify="end">
      <Col span={9}>
        <p>{item.itemName}</p>
      </Col>
      <Col span={6}>
        <p>{item.totalOutEarns}rs</p>
      </Col>
      <Col span={6}>
        <p style={{ color: getColor(item.lastWeekProgress) }}>
          {item.lastWeekProgress}%
        </p>
      </Col>
      <Col span={3}>{getIcon(item.lastWeekProgress || 0)}</Col>
    </Row>
  );
};
export const RowItemRecentCard = ({ item }) => {
  return (
    <Row>
      <Col span={8}>
        <p>{item.itemName}</p>
      </Col>
      <Col span={10}>
        <p>{item.updatedAt}</p>
      </Col>
      <Col span={6}>
        <p>{(item.count < 10 ? '0' : '') + item.count} count</p>
      </Col>
    </Row>
  );
};
export default {};
