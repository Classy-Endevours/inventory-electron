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
    title: 'Item Name',
    dataIndex: 'item',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.itemName.indexOf(value) === 0,
    sorter: (a, b) => a.itemName.localeCompare(b.itemName),
    // sortDirections: ['descend'],
    render: (itemName) => {
      return <ColoredRow>{itemName.productName}</ColoredRow>;
    },
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    filterMultiple: false,
    onFilter: (value, record) => record.hsnCode.indexOf(value) === 0,
    sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
    render: (supplier) => {
      return <ColoredRow>{supplier.name}</ColoredRow>;
    },
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    sorter: (a, b) => a.composition - b.composition,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.percent - b.percent,
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
