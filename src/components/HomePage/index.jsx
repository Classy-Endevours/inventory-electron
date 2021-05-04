import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './index.scss';
import Dashboard from '../Dashboard';

const { Header, Content, Footer, Sider } = Layout;

export default function HomePage() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">Inventory</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[2]}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Supplier</Menu.Item>
          <Menu.Item key="3">Vendors</Menu.Item>
          <Menu.Item key="4">Inventory</Menu.Item>
          <Menu.Item key="5">Challan</Menu.Item>
          <Menu.Item key="6">Logout</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          {/* <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="1">Dashboard</Menu.Item>
              <Menu.Item key="2">Supplier</Menu.Item>
              <Menu.Item key="3">Vendors</Menu.Item>
              <Menu.Item key="4">Inventory</Menu.Item>
              <Menu.Item key="5">Challan</Menu.Item>
              <Menu.Item key="6">Logout</Menu.Item>
            </Menu>
          </Sider>
          <Dashboard />
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Inventory Project @2021</Footer>
    </Layout>
  );
}
