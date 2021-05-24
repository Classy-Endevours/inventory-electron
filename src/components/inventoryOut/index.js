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

import { addChallan, editChallan } from '../Challan/reducer';
import {
  ColorerdTable,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddInventoryOutForm } from '../../common/components/inventoryOut/addForm';
import { ChallanForm } from '../../common/components/inventoryOut/challanForm';

const { Content } = Layout;

const InventoryOut = () => {
  const [addItemModal, setAddItemModal] = useState(false);
  const [challanModal, setChallanModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const { isLoading, inventoryOut, isAddLoading, isEditLoading } = useSelector(
    (state) => state.InventoryOutReducer,
  );

  const {
    isAddLoading: isAddChallanLoading,
    isEditLoading: isEditChallanLoading,
  } = useSelector((state) => state.ChallanReducer);
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
      case 'newChallan':
        dispatch(addChallan(data));
        break;
      case 'editChallan':
        dispatch(editChallan(data));
        break;
      default:
        break;
    }
  };

  const getColumnsWithAction = () => {
    const editHandler = (item) => {
      setCurrentObject(item);
      setMode('edit');
      setAddItemModal(true);
    };
    const challanHandler = (item) => {
      if (item.challan.id) {
        setMode('editChallan');
        setCurrentObject({
          ...item,
          productName: item.challan.productName,
          name: item.vendor.name,
          truckNo: item.challan.truckNo,
        });
      } else {
        setMode('newChallan');
        setCurrentObject({
          ...item,
          productName: item.item.productName,
          name: item.vendor.name,
        });
      }
      setChallanModal(true);
    };
    return getColumns(editHandler, challanHandler);
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
      {challanModal && (
        <ChallanForm
          title="Download Challan"
          isOpen={challanModal}
          onOk={(data) => onOk(data)}
          onCancel={() => setChallanModal(!challanModal)}
          setCurrentObject={setCurrentObject}
          initialValues={currentObject}
          mode={mode}
          loading={
            mode === 'newChallan' ? isAddChallanLoading : isEditChallanLoading
          }
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
            columns={getColumnsWithAction()}
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
