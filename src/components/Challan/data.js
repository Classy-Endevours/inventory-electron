/* eslint-disable react/destructuring-assignment */
// import { Col, Row } from 'antd';
// import { EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { ColoredRow } from '../../common/uielements/Collection.style';

export const getColumns = () => [
  {
    title: 'Sr. No',
    key: 'index',
    render: (value, item, index) => index + 1,
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Inventory Out ID',
    dataIndex: 'inventoryOut',
    sorter: (a, b) => a.id - b.id,
    render: (inventoryOut) => inventoryOut.id,
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Item Name',
    dataIndex: 'productName',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.itemName.indexOf(value) === 0,
    sorter: (a, b) => a.itemName.localeCompare(b.itemName),
    // sortDirections: ['descend'],
    render: (productName) => {
      return <ColoredRow>{productName}</ColoredRow>;
    },
  },
  {
    title: 'Vendor',
    dataIndex: 'inventoryOut',
    filterMultiple: false,
    onFilter: (value, record) => record.hsnCode.indexOf(value) === 0,
    sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
    render: (inventoryOut) => {
      return <ColoredRow>{inventoryOut.vendor.name}</ColoredRow>;
    },
  },
  {
    title: 'Rate',
    dataIndex: 'inventoryOut',
    sorter: (a, b) => a.composition - b.composition,
    render: (inventoryOut) => inventoryOut.rate,
  },
  {
    title: 'Quantity',
    dataIndex: 'inventoryOut',
    sorter: (a, b) => a.percent - b.percent,
    render: (inventoryOut) => inventoryOut.quantity,
  },
  {
    title: 'Date',
    dataIndex: 'updatedAt',
    sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    render: (text) => {
      return moment(text).format('MMM Do YY');
    },
  },
  // {
  //   title: 'Action',
  //   dataIndex: '',
  //   key: 'x',
  //   render: (itemName, row) => (
  //     <Row>
  //       <Col>
  //         <EditTwoTone onClick={() => onEditAction(itemName, row)} />
  //       </Col>
  //     </Row>
  //   ),
  // },
];
export default {};
