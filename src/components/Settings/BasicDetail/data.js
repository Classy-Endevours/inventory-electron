import { Col, Row } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { ColoredRow } from '../../../common/uielements/Collection.style';

export const getColumns = (onEditAction) => [
  {
    title: 'Sr.',
    key: 'index',
    render: (value, item, index) => index + 1,
    // defaultSortOrder: 'descend',
  },
  {
    title: 'Name',
    dataIndex: 'name',
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
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.localeCompare(b.name),
    // sortDirections: ['descend'],
    render: (itemName) => <ColoredRow>{itemName}</ColoredRow>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile1',
    sorter: (a, b) => a.mobile1.localeCompare(b.mobile1),
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile2',
    onFilter: (value, record) => record.hsnCode.indexOf(value) === 0,
    sorter: (a, b) => a.mobile2.localeCompare(b.mobile2),
  },
  {
    title: 'GST No.',
    dataIndex: 'gstNo',
    sorter: (a, b) => a.gstNo.localeCompare(b.gstNo),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Default',
    dataIndex: 'isDefault',
    sorter: (a, b) => a.isDefault.localeCompare(b.isDefault),
    render: (text) => {
      return text ? 'True' : 'False';
    },
  },
  {
    title: 'Date',
    dataIndex: 'updatedAt',
    sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    render: (text) => {
      return moment(text).format('MMM Do YY');
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (itemName, row) => (
      <Row>
        <Col>
          <EditTwoTone onClick={() => onEditAction(itemName, row)} />
        </Col>
      </Row>
    ),
  },
];
export default {};
