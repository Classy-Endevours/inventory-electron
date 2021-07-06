/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import { useState } from 'react';
import {
  DashboardChildLayout,
  DashboardFixedLayout,
  DashboardMenu,
  DashboardHeader,
} from '../../common/uielements/Dasbord.styles';

const Setting = ({ Components }) => {
  const [currentView, setCurrentView] = useState('1');

  const renderCurrentView = () => {
    const index = parseInt(currentView, 10) - 1;
    const Component = Components[index];
    return <Component />;
  };

  return (
    <Layout>
      <DashboardHeader
        style={{
          padding: 0,
        }}
      >
        <DashboardMenu
          mode="horizontal"
          defaultSelectedKeys={[currentView]}
          defaultOpenKeys={['sub1']}
          style={
            {
              // marginTop: '-4px',
              // height: 'calc(100% + 4px)',
            }
          }
        >
          <DashboardMenu.Item key="1" onClick={() => setCurrentView('1')}>
            Application Setting
          </DashboardMenu.Item>
          <DashboardMenu.Item key="2" onClick={() => setCurrentView('2')}>
            Security Setting
          </DashboardMenu.Item>
        </DashboardMenu>
      </DashboardHeader>
      <DashboardChildLayout>
        <DashboardFixedLayout style={{ paddingTop: 5 }}>
          {renderCurrentView()}
        </DashboardFixedLayout>
      </DashboardChildLayout>
    </Layout>
  );
};

export default Setting;
