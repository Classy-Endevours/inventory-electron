import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Supplier from '../Supplier';
// import Dashboard from '../Dashboard';
import {
  DashboardSider,
  DashboardMenu,
  DashboardParentLayout,
  DashboardChildLayout,
  DashboardContentLayout,
  DashboardHeader,
} from '../../common/uielements/Dasbord.styles';
import { clear } from '../Login/reducer';

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <DashboardParentLayout>
      <DashboardHeader className="header" theme="light">
        <b>Rajesh Exports</b>
      </DashboardHeader>
      <Layout>
        <DashboardSider>
          <DashboardMenu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme="dark"
          >
            <DashboardMenu.Item key="1">Dashboard</DashboardMenu.Item>
            <DashboardMenu.Item key="2">Supplier</DashboardMenu.Item>
            <DashboardMenu.Item key="3">Vendors</DashboardMenu.Item>
            <DashboardMenu.Item key="4">Items</DashboardMenu.Item>
            <DashboardMenu.Item key="5">Inventory</DashboardMenu.Item>
            <DashboardMenu.Item key="6">Challan</DashboardMenu.Item>
            <DashboardMenu.Item key="7">Settings</DashboardMenu.Item>
            <DashboardMenu.Item
              key="8"
              onClick={async () => {
                dispatch(clear());
                await localStorage.setItem('login', false);
                history.push('/');
              }}
            >
              Logout
            </DashboardMenu.Item>
          </DashboardMenu>
        </DashboardSider>
        <DashboardChildLayout>
          <DashboardContentLayout>
            <Supplier />
          </DashboardContentLayout>
          {/* <DashboardFooter>Rajesh Exports &#169;2021</DashboardFooter> */}
        </DashboardChildLayout>
      </Layout>
    </DashboardParentLayout>
  );
}
