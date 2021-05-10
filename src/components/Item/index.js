import React, { useEffect } from 'react';
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
  ColoredRow,
  BorderedCard,
  NewContentButton,
} from '../../common/uielements/Collection.style';

const { Content } = Layout;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Item Name',
    dataIndex: 'itemName',
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.itemName.indexOf(value) === 0,
    sorter: (a, b) => a.itemName - b.itemName,
    sortDirections: ['descend'],
    render: (itemName) => <ColoredRow>{itemName}</ColoredRow>,
  },
  {
    title: 'Composition',
    dataIndex: 'composition',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.composition - b.composition,
  },
  {
    title: 'Percent',
    dataIndex: 'percent',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.percent - b.percent,
    render: (percent) => `${percent}%`,
  },
  {
    title: 'HSN Code',
    dataIndex: 'hsnCode',
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    filterMultiple: false,
    onFilter: (value, record) => record.hsnCode.indexOf(value) === 0,
    sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const Item = () => {
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
      <Row justify="end">
        <Space>
          <NewContentButton shape="round" icon={<DownloadOutlined />}>
            Export Items
          </NewContentButton>
          <NewContentButton shape="round" icon={<FolderAddOutlined />}>
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
            columns={columns}
            dataSource={items}
            pagination={{ pageSize: 10 }}
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
