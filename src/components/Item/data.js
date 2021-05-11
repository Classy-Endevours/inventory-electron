import { Col, Row } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { ColoredRow } from '../../common/uielements/Collection.style';

export const getColumns = (onEditAction) => [
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
    sorter: (a, b) => a.itemName.localeCompare(b.itemName),
    // sortDirections: ['descend'],
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
