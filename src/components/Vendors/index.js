/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import { getVendor, addVendor, editVendor } from './reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddVendorForm } from '../../common/components/vendor/addForm';

const { Content } = Layout;

const Vendor = () => {
  const [addVendorModal, setVendorModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, vendor, isAddLoading, isEditLoading } = useSelector(
    (state) => state.VendorReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVendor());
  }, []);
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addVendor(data));
        break;
      case 'edit':
        dispatch(editVendor(data));
        break;
      default:
        break;
    }
  };
  return (
    <Content>
      {addVendorModal && (
        <AddVendorForm
          title="Add New Vendor"
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
            Export Vendor
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => {
              setMode('new');
              setVendorModal(!addVendorModal);
            }}
          >
            Add Vendor
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
            dataSource={vendor}
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
