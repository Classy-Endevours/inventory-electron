import React from 'react';
import 'antd/dist/antd.css';
import './index.scss';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

// import { Content } from 'antd/lib/layout/layout';

// const { Title } = Typography;

export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Row className="login_container" align="top" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Title style={{ color: 'white' }} level={3}>
            Inventory
          </Title>
        </Col>
      </Row>
      <Row style={{ width: '100%' }} justify="center" align="middle">
        <Col type="flex" align="middle" justify="center">
          <Card
            style={{
              width: 600,
              borderRadius: '10px',
            }}
          >
            <Title className="heading">Login</Title>
            <Paragraph level={4} className="sub_heading">
              Hello there! Sign in and start managing your store items
            </Paragraph>
            <Form
              name="normal_login"
              initialValues={{ size: 'large' }}
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}
