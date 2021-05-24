/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { Layout, Menu } from 'antd';

const { Sider, Footer, Header } = Layout;

export const DashboardSider = styled(Sider)`
  width: 200px;
`;

export const DashboardMenu = styled(Menu)`
  height: 100%;
`;

export const DashboardParentLayout = styled(Layout)`
  height: 100vh;
`;

export const DashboardChildLayout = styled(Layout)`
  height: 100%;
  overflow: auto;
`;

export const DashboardContentLayout = styled(Layout)`
  background: #ffffff;
  height: 100%;
  overflow: auto;
  margin: 20px;
  padding: 20px;
`;

export const DashboardFixedLayout = styled(Layout)`
  background: #ffffff;
  height: 100%;
  overflow: auto;
  padding: 20px;
`;

export const DashboardFooter = styled(Footer)`
  height: 30px;
  padding: 0;
  text-align: center;
  bottom: 0;
`;

export const DashboardHeader = styled(Header)`
  float: left;
  color: white;
  font-size: 20px;
`;
