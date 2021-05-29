import React from 'react';
import { Layout, Row, Col, Table, List } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import LineGraph from '../../common/components/dashboard/LineGraph';
import Card from '../../common/components/regular/Cards';
import { BorderedCard } from '../../common/uielements/Collection.style';
import { TopSuppliers, TopVendors, TopVendorsColumns } from './data';
import PieGraph from '../../common/components/dashboard/PieGraph';
import ColumnGraph from '../../common/components/dashboard/ColumnGraph';

const { Content } = Layout;

export default function Dashboard() {
  console.log({
    TopVendorsColumns,
    TopVendors,
  });
  return (
    <Content style={{ padding: '0 24px' }}>
      <Row
        align="middle"
        justify="space-between"
        style={{ paddingBottom: '20px' }}
      >
        <Card
          headingText="Total Sales"
          mainText="rs 123,123"
          middleText="last week sales rs 400"
          bottomText="Piyush is the biggest vendor"
        />
        <Card
          headingText="Visit"
          mainText="9000"
          middleText="last week visit count 100"
          bottomText="Daily visit average 14"
        />
        <Card
          headingText="Payments"
          mainText="4000"
          middleText="last week payment count 12"
          bottomText="Conversion rate is 50%"
        />
        <Card
          headingText="Operation Effect"
          middleText="-10% from previous period"
          mainText="90%"
          bottomText="Clorian has the hightest sales"
        />
      </Row>
      <Row style={{ paddingBottom: '50px' }}>
        <Col span={24}>
          <LineGraph />
        </Col>
      </Row>
      <Row
        style={{ paddingBottom: '50px' }}
        align="middle"
        justify="space-between"
      >
        <Col span={16}>
          <ColumnGraph />
        </Col>
        <Col span={7}>
          <List
            header={<Paragraph>Top Suppliers</Paragraph>}
            bordered
            dataSource={TopSuppliers}
            renderItem={(item) => (
              <List.Item>
                <Paragraph>
                  {item.name} with {item.quantity}
                </Paragraph>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row align="middle" style={{ paddingBottom: '20px' }}>
        <Col span={12}>
          <BorderedCard title="Top Vendors">
            <Table
              dataSource={TopVendors}
              pagination={false}
              columns={TopVendorsColumns}
            />
          </BorderedCard>
        </Col>
        <Col span={12}>
          <PieGraph />
        </Col>
      </Row>
    </Content>
  );
}
