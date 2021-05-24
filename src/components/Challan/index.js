/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { getChallan } from './reducer';
import { ColorerdTable } from '../../common/uielements/Collection.style';
import { getColumns } from './data';

const { Content } = Layout;

const Challan = () => {
  const { isLoading, challans } = useSelector((state) => state.ChallanReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChallan());
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <Content>
      <Row justify="space-around">
        <Col span={24}>
          <ColorerdTable
            columns={getColumns()}
            dataSource={challans}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Content>
  );
};
export default Challan;
