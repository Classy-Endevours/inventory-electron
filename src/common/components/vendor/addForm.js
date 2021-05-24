/* eslint-disable react/prop-types */
import React from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
} from '../../uielements/Collection.style';

export function AddVendorForm({
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
          label="Vendor Name"
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
          name="deliveryAddress"
          label="Delivery Address"
          rules={[
            {
              required: true,
              message: 'Please input the delivery address!',
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
