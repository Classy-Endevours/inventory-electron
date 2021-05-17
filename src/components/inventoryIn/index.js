/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import { getInventoryIns, addInventoryIns, editInventoryIns } from './reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddInventoryInForm } from '../../common/components/inventoryIn/addForm';

const { Content } = Layout;

const InventoryIn = () => {
  const [addItemModal, setAddItemModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, inventoryIn, isAddLoading, isEditLoading } = useSelector(
    (state) => state.InventoryInReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventoryIns());
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addInventoryIns(data));
        break;
      case 'edit':
        dispatch(editInventoryIns(data));
        break;
      default:
        break;
    }
  };
  return (
    <Content>
      {addItemModal && (
        <AddInventoryInForm
          title="Add New Inventory In"
          isOpen={addItemModal}
          onOk={(data) => onOk(data)}
          onCancel={() => setAddItemModal(!addItemModal)}
          initialValues={currentObject}
          setCurrentObject={setCurrentObject}
          loading={mode === 'new' ? isAddLoading : isEditLoading}
        />
      )}

      <Row justify="end">
        <Space>
          <NewContentButton shape="round" icon={<DownloadOutlined />}>
            Export Inventory
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => {
              setMode('new');
              setAddItemModal(!addItemModal);
            }}
          >
            Add Inventory In
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
            columns={getColumns((item) => {
              setCurrentObject(item);
              setMode('edit');
              setAddItemModal(true);
            })}
            dataSource={inventoryIn}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Content>
  );
};
export default InventoryIn;
