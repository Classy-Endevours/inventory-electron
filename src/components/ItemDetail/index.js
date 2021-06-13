/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from 'antd/lib/typography/Title';
import { Line } from '@ant-design/charts';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row, Spin, Checkbox } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import TotalPlate from '../../common/components/dashboard/TotalPlate';
import { getComparisonGraph, mergeNestedObjects } from '../Dashboard/reducer';
import { getItems } from '../Item/reducer';
import { NewContentButton } from '../../common/uielements/Collection.style';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Paragraph>Last Week</Paragraph>
    </Menu.Item>
    <Menu.Item key="2">
      <Paragraph>Last Month</Paragraph>
    </Menu.Item>
    <Menu.Item key="3">
      <Paragraph>Last Year</Paragraph>
    </Menu.Item>
  </Menu>
);
const ItemMenu = ({ data, status = [], onConfirm }) => {
  const [statuses, setStatus] = useState(new Set(status));
  const onItemChange = (id, checked) => {
    if (checked) {
      setStatus((prev) => new Set(prev.add(id)));
    } else {
      setStatus((prev) => new Set([...prev].filter((x) => x !== id)));
    }
  };
  const onSubmit = () => {
    // return array
    onConfirm([...statuses]);
  };
  return (
    <Menu>
      {data.map((item) => {
        return (
          <Menu.Item key={item.id}>
            <Checkbox
              onChange={(e) => onItemChange(item.id, e.target.checked)}
              checked={statuses.has(item.id)}
            >
              {item.productName}
            </Checkbox>
          </Menu.Item>
        );
      })}
      <NewContentButton shape="round" key="back" onClick={() => onSubmit()}>
        Save
      </NewContentButton>
    </Menu>
  );
};
const id = [1, 3, 4, 5];

const ItemDetails = () => {
  const [selectedItems, setSelectedItems] = useState(id);
  const {
    isLoading,
    isError,
    data: comparisonitems,
  } = useSelector((state) => state.DashboardReducer.comparison);
  const { items } = useSelector((state) => state.ItemsReducer);
  const dispatch = useDispatch();
  const refreshPage = (ids) => {
    dispatch(getComparisonGraph({ id: ids }));
  };
  const getTitleName = () => {
    let name = '';
    comparisonitems.totalPlate.forEach((item, index) => {
      if (index === 0) {
        name = name.concat(`${item.name}`);
      } else {
        name = name.concat(` + ${item.name}`);
      }
    });
    return name.toUpperCase() || 'Item';
  };
  useEffect(() => {
    refreshPage(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const config = {
    // data: mergeNestedObjects(data, 'item'),
    data: mergeNestedObjects(comparisonitems.data || [], 'item'),
    xField: 'month_year',
    yField: 'totalOutEarns',
    seriesField: 'productName',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1).toFixed(1), ' rs');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <Paragraph>Some error occured while loading the graph</Paragraph>;
  }
  return (
    <Col>
      <Row align="center" justify="space-between">
        <Title level={2}>{getTitleName()}</Title>
        <Col>
          <Dropdown overlay={menu} trigger={['click']}>
            <Title
              level={5}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Filter <DownOutlined />
            </Title>
          </Dropdown>
          <Dropdown
            overlay={
              <ItemMenu
                status={selectedItems}
                data={items}
                onConfirm={(itemsId) => setSelectedItems(itemsId)}
              />
            }
            trigger={['click']}
          >
            <Title
              level={5}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Items <DownOutlined />
            </Title>
          </Dropdown>
        </Col>
      </Row>
      <Line {...config} />
      <br />
      <TotalPlate data={comparisonitems.totalPlate} />
    </Col>
  );
};

export default ItemDetails;
