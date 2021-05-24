import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const Loader = () => {
  return (
    <Row align="middle" justify="center" style={{ height: '100%' }}>
      <Col>
        <Spin indicator={antIcon} />
      </Col>
    </Row>
  );
};
export default Loader;
