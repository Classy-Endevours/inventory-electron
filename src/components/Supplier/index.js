/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import { getItems, addItems, editItems } from './reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddSupplierForm } from '../../common/components/supplier/addForm';

const { Content } = Layout;

const Supplier = () => {
  const [addSupplierModal, setSupplierModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, items, isAddLoading, isEditLoading } = useSelector(
    (state) => state.ItemsReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addItems(data));
        break;
      case 'edit':
        dispatch(editItems(data));
        break;
      default:
        break;
    }
  };
  return (
    <Content>
      {addSupplierModal && (
        <AddSupplierForm
          title="Add New Supplier"
          isOpen={addSupplierModal}
          onOk={(data) => onOk(data)}
          onCancel={() => setSupplierModal(!addSupplierModal)}
          initialValues={currentObject}
          setCurrentObject={setCurrentObject}
          loading={mode === 'new' ? isAddLoading : isEditLoading}
        />
      )}

      <Row justify="end">
        <Space>
          <NewContentButton shape="round" icon={<DownloadOutlined />}>
            Export Supplier
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => {
              setMode('new');
              setSupplierModal(!addSupplierModal);
            }}
          >
            Add Supplier
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
            columns={getColumns((supplier) => {
              setCurrentObject(supplier);
              setMode('edit');
              setSupplierModal(true);
            })}
            dataSource={items}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Content>
  );
};
export default Supplier;
