/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import {
  RowItemInfoCard,
  RowItemRecentCard,
} from '../../common/components/regular/RowItemInfoCard';
import { getItems, addItems, editItems } from './reducer';
import {
  ColorerdTable,
  BorderedCard,
  NewContentButton,
} from '../../common/uielements/Collection.style';
import { getColumns } from './data';
import { AddItemForm } from '../../common/components/item/addForm';

const { Content } = Layout;

const Item = () => {
  const [addItemModal, setAddItemModal] = useState(false);
  const [mode, setMode] = useState('');
  const [currentObject, setCurrentObject] = useState({});
  const {
    isLoading,
    items,
    recentItems,
    mostOutItems,
    isAddLoading,
    isEditLoading,
  } = useSelector((state) => state.ItemsReducer);
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
      {addItemModal && (
        <AddItemForm
          title="Add New Item"
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
            Export Items
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => {
              setMode('new');
              setAddItemModal(!addItemModal);
            }}
          >
            Add Item
          </NewContentButton>
          <div />
          <div />
          <div />
        </Space>
      </Row>
      <Divider orientation="left" />
      <Row justify="space-around">
        <Col span={17}>
          <ColorerdTable
            columns={getColumns((item) => {
              setCurrentObject(item);
              setMode('edit');
              setAddItemModal(true);
            })}
            dataSource={items}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
            loading={isLoading}
          />
        </Col>
        <Col type="flex" align="top" justify="space-around" span={6}>
          <BorderedCard
            title="Recent Inventory Out"
            extra={<span>More</span>}
            style={{ width: 300 }}
            loading={isLoading}
          >
            {recentItems.map((item) => (
              <RowItemRecentCard key={item.id} item={item} />
            ))}
          </BorderedCard>
          <Divider />
          <BorderedCard
            title="Top Inventory Out"
            extra={<span>More</span>}
            style={{ width: 300 }}
            loading={isLoading}
          >
            {mostOutItems.map((item) => (
              <RowItemInfoCard key={item.id} item={item} />
            ))}
          </BorderedCard>
        </Col>
      </Row>
    </Content>
  );
};
export default Item;
