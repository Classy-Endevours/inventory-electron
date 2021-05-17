import { Col, Row } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { ColoredRow } from '../../common/uielements/Collection.style';

export const getColumns = (onEditAction) => [
  {
    title: 'Sr. No.',
    key: 'index',
    render: (value, item, index) => index + 1,
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Supplier Name',
    dataIndex: 'name',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.itemName.indexOf(value) === 0,
    sorter: (a, b) => a.itemName.localeCompare(b.itemName),
    // sortDirections: ['descend'],
    render: (itemName) => <ColoredRow>{itemName}</ColoredRow>,
  },
  {
    title: 'Delivery Address',
    dataIndex: 'deliveryAddress',
    sorter: (a, b) => a.composition - b.composition,
  },
  {
    title: 'GST No.',
    dataIndex: 'gstNo',
    filterMultiple: false,
    onFilter: (value, record) => record.hsnCode.indexOf(value) === 0,
    sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
  },
  {
    title: 'Date',
    dataIndex: 'updatedAt',
    sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    render: (text) => {
      return moment(text).format('MM/DD/YY');
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (supplier, row) => (
      <Row>
        <Col>
          <EditTwoTone onClick={() => onEditAction(supplier, row)} />
        </Col>
      </Row>
    ),
  },
];
export default {};
