import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import './index.scss';
import { Row, Col, Form, Input, Button, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useHistory } from 'react-router-dom';
import { login } from './reducer';

// import { Content } from 'antd/lib/layout/layout';

// const { Title } = Typography;

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, message, success, fail } = useSelector(
    (state) => state.loginReducer,
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    if (success && !fail) {
      notification.success({
        message: 'Success',
        description: message,
        duration: 2,
      });
      localStorage.setItem('login', true);
      history.push('/Loader');
    } else if (!success && fail) {
      notification.error({
        message: 'Error',
        description: message,
        duration: 2,
      });
    }
  }, [isLoading, success, fail]);
  // function handleClick() {
  //   history.push('/Dashboard');
  // }
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
            loading={isLoading}
          >
            <Title className="heading">Login</Title>
            <Paragraph level={4} className="sub_heading">
              Hello there! Sign in and start managing your store items
            </Paragraph>
            <Form
              name="normal_login"
              initialValues={{ size: 'large' }}
              className="login-form"
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => dispatch(login({ username, password }))}
                  disabled={!(password !== '' && username !== '')}
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
