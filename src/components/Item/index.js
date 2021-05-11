import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { DownloadOutlined, FolderAddOutlined } from '@ant-design/icons';
import Loader from '../../common/components/regular/Loader';
import {
  RowItemInfoCard,
  RowItemRecentCard,
} from '../../common/components/regular/RowItemInfoCard';
import { getItems } from './reducer';
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
  const { isLoading, items, recentItems, mostOutItems } = useSelector(
    (state) => state.ItemsReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Content>
      <AddItemForm
        title="Add New Item"
        isOpen={addItemModal}
        onOk={() => setAddItemModal(!addItemModal)}
        onCancel={() => setAddItemModal(!addItemModal)}
      />

      <Row justify="end">
        <Space>
          <NewContentButton shape="round" icon={<DownloadOutlined />}>
            Export Items
          </NewContentButton>
          <NewContentButton
            shape="round"
            icon={<FolderAddOutlined />}
            onClick={() => setAddItemModal(!addItemModal)}
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
            columns={getColumns((item, row) => {
              console.log({ item, row });
            })}
            dataSource={items}
            pagination={{ pageSize: 10 }}
            style={{ padding: 10 }}
          />
        </Col>
        <Col type="flex" align="top" justify="space-around" span={6}>
          <BorderedCard
            title="Recent Inventory Out"
            extra={<span>More</span>}
            style={{ width: 300 }}
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
