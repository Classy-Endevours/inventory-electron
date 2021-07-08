import { Row, Col, Spin, notification } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DashboardParentLayout } from '../../common/uielements/Dasbord.styles';
import { getDefaultSetting } from '../Settings/BasicDetail/reducer';

export default function Loader() {
  const dispatch = useDispatch();
  const { isLoading, message, isSuccess, isError } = useSelector(
    (state) => state.BasicSettingReducer,
  );
  const history = useHistory();
  useEffect(async () => {
    if (isSuccess && !isError) {
      history.push('/Dashboard');
    } else if (!isSuccess && isError) {
      notification.error({
        message: 'Error',
        description: message,
        duration: 2,
      });
    }
  }, [isLoading, isSuccess, isError]);
  useEffect(() => {
    dispatch(
      getDefaultSetting({
        where: {
          isDefault: true,
        },
      }),
    );
  }, []);
  return (
    <DashboardParentLayout>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    </DashboardParentLayout>
  );
}
