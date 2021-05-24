/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import { getSupplier, addSupplier, editSupplier } from './reducer';
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
  const { isLoading, supplier, isAddLoading, isEditLoading } = useSelector(
    (state) => state.SupplierReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSupplier());
  }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
  const onOk = (data) => {
    switch (mode) {
      case 'new':
        dispatch(addSupplier(data));
        break;
      case 'edit':
        dispatch(editSupplier(data));
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
            columns={getColumns((suppliers) => {
              setCurrentObject(suppliers);
              setMode('edit');
              setSupplierModal(true);
            })}
            dataSource={supplier}
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
