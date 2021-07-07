/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import { getSetting, addSettings, updateSetting } from './reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddSettingsForm } from '../../../common/components/settings/addForm';

const { Content } = Layout;

const Vendor = () => {
  const [addVendorModal, setVendorModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, basicDetails, isAddLoading, isEditLoading } = useSelector(
    (state) => state.BasicSettingReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting());
  }, []);
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addSettings(data));
        break;
      case 'edit':
        dispatch(updateSetting(data));
        break;
      default:
        break;
    }
  };
  return (
    <Content>
      {addVendorModal && (
        <AddSettingsForm
          title="Add New Settings"
          isOpen={addVendorModal}
          onOk={(data) => onOk(data)}
          onCancel={() => setVendorModal(!addVendorModal)}
          initialValues={currentObject}
          setCurrentObject={setCurrentObject}
          loading={mode === 'new' ? isAddLoading : isEditLoading}
        />
      )}

      <Row justify="end">
        <Space>
          <NewContentButton shape="round" icon={<DownloadOutlined />}>
            Export Settings
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => {
              setMode('new');
              setVendorModal(!addVendorModal);
            }}
          >
            Add New details
          </NewContentButton>
          <div />
          <div />
          <div />
        </Space>
      </Row>
      <Divider orientation="left" />
      <Row justify="space-around">
        <Col span={24}>
          <ColorerdTable
            columns={getColumns((row) => {
              setCurrentObject(row);
              setMode('edit');
              setVendorModal(true);
            })}
            dataSource={basicDetails}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Content>
  );
};
export default Vendor;
