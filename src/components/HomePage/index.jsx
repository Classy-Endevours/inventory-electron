/* eslint-disable react/prop-types */
import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

export default function HomePage({ MainComponent }) {
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
            <DashboardMenu.Item
              key="1"
              onClick={() => history.push('/Dashboard')}
            >
              Dashboard
            </DashboardMenu.Item>
            <DashboardMenu.Item
              key="2"
              onClick={() => history.push('/Supplier')}
            >
              Supplier
            </DashboardMenu.Item>
            <DashboardMenu.Item key="3" onClick={() => history.push('/Vendor')}>
              Vendors
            </DashboardMenu.Item>
            <DashboardMenu.Item key="4" onClick={() => history.push('/Items')}>
              Items
            </DashboardMenu.Item>
            <DashboardMenu.Item
              key="5"
              onClick={() => history.push('/InventoryIn')}
            >
              Inventory In
            </DashboardMenu.Item>
            <DashboardMenu.Item key="6">Inventory Out</DashboardMenu.Item>
            <DashboardMenu.Item key="7">Challan</DashboardMenu.Item>
            <DashboardMenu.Item
              key="8"
              onClick={() => history.push('/Settings')}
            >
              Settings
            </DashboardMenu.Item>
            <DashboardMenu.Item
              key="9"
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
            <MainComponent />
          </DashboardContentLayout>
          {/* <DashboardFooter>Rajesh Exports &#169;2021</DashboardFooter> */}
        </DashboardChildLayout>
      </Layout>
    </DashboardParentLayout>
  );
}
