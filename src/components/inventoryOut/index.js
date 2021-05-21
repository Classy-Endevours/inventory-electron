/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import {
  getInventoryOuts,
  addInventoryOuts,
  editInventoryOuts,
} from './reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddInventoryOutForm } from '../../common/components/inventoryOut/addForm';

const { Content } = Layout;

const InventoryOut = () => {
  const [addItemModal, setAddItemModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, inventoryOut, isAddLoading, isEditLoading } = useSelector(
    (state) => state.InventoryOutReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventoryOuts());
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addInventoryOuts(data));
        break;
      case 'edit':
        dispatch(editInventoryOuts(data));
        break;
      default:
        break;
    }
  };
  return (
    <Content>
      {addItemModal && (
        <AddInventoryOutForm
          title="Add New Inventory Out"
          isOpen={addItemModal}
          onOk={(data) => onOk(data)}
          onCancel={() => setAddItemModal(!addItemModal)}
          initialValues={
            mode === 'new'
              ? currentObject
              : {
                  ...currentObject,
                  itemId: `${currentObject.itemId} ${currentObject.item.availableQuantity}`,
                }
          }
          setCurrentObject={setCurrentObject}
          mode={mode}
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
            Add Inventory Out
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
            dataSource={inventoryOut}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Content>
  );
};
export default InventoryOut;
