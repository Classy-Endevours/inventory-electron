import React from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderChips from '../../common/components/dashboard/HeaderChips';
import LineGraph from '../../common/components/dashboard/LineGraph';

const { Content } = Layout;

export default function Dashboard() {
  return (
    <Content style={{ padding: '0 24px' }}>
      <Row align="middle" justify="space-around">
        <Col span={5}>
          <HeaderChips title="Total Inventory">
            <div>
              <div>
                <h4>In Products</h4>
                <p>100</p>
              </div>
              <div>
                <h4>Out Products</h4>
                <p>76</p>
              </div>
            </div>
          </HeaderChips>
        </Col>
        <Col span={5}>
          <HeaderChips title="Total Inventory">
            <div>
              <div>
                <h4>In Products</h4>
                <p>100</p>
              </div>
              <div>
                <h4>Out Products</h4>
                <p>76</p>
              </div>
            </div>
          </HeaderChips>
        </Col>
        <Col span={5}>
          <HeaderChips title="Total Inventory">
            <div>
              <div>
                <h4>In Products</h4>
                <p>100</p>
              </div>
              <div>
                <h4>Out Products</h4>
                <p>76</p>
              </div>
            </div>
          </HeaderChips>
        </Col>
        <Col span={5}>
          <HeaderChips title="Total Inventory">
            <div>
              <div>
                <h4>In Products</h4>
                <p>100</p>
              </div>
              <div>
                <h4>Out Products</h4>
                <p>76</p>
              </div>
            </div>
          </HeaderChips>
        </Col>
      </Row>
      {/* <Divider orientation="left" /> */}
      <Row>
        <Col span={24}>
          <LineGraph />
        </Col>
      </Row>
    </Content>
  );
}
