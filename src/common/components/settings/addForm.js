/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
} from '../../uielements/Collection.style';

export function AddSettingsForm({
  title,
  isOpen,
  onOk,
  onCancel,
  loading,
  initialValues = {},
  setCurrentObject,
}) {
  const [form] = Form.useForm();
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...initialValues, ...values });
      })
      .catch(() => {
        console.log('logged');
      });
  };
  const onModalCancel = () => {
    setCurrentObject({});
    onCancel();
  };
  return (
    <CustomModal
      title={title}
      centered
      visible={isOpen}
      onOk={onOk}
      onCancel={onModalCancel}
      footer={[
        <NewContentButton
          shape="round"
          key="back"
          icon={<RollbackOutlined />}
          onClick={onModalCancel}
        >
          Back
        </NewContentButton>,
        <AntiContentButton
          key="submit"
          shape="round"
          type="primary"
          icon={<CheckCircleOutlined />}
          loading={loading}
          onClick={validate}
        >
          Save
        </AntiContentButton>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the vendor name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile1"
          label="Mobile No. 1"
          rules={[
            {
              required: true,
              // type: 'regexp',
              pattern: new RegExp(/^\d{10}$/),
              message: 'Please input vaild Mobile No. 1!',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} type="number" />
        </Form.Item>
        <Form.Item
          name="mobile2"
          label="Mobile No. 2"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^\d{10}$/),
              message: 'Please input vaild Mobile No. 2!',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} type="number" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              pattern: new RegExp(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              ),
              message: 'Please input vaild email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gstNo"
          label="GST No"
          rules={[
            {
              required: true,
              message: 'Please input the GST Number!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </CustomModal>
  );
}
export default {};
