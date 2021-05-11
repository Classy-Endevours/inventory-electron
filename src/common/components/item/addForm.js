/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
} from '../../uielements/Collection.style';

export function AddItemForm({
  title,
  isOpen,
  onOk,
  onCancel,
  loading,
  initialValues = {},
}) {
  const [form] = Form.useForm();
  const [percent, setPercentage] = useState(initialValues.percent || 1.0);
  const [composition, setComposition] = useState(
    initialValues.composition || 1.0,
  );
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...initialValues, ...values, ...{ percent, composition } });
      })
      .catch(() => {
        console.log('logged');
      });
  };
  return (
    <CustomModal
      title={title}
      centered
      visible={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <NewContentButton
          shape="round"
          key="back"
          icon={<RollbackOutlined />}
          onClick={onCancel}
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
          name="productName"
          label="Item Name"
          rules={[
            {
              required: true,
              message: 'Please input the item name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="composition"
          label="Composition"
          rules={[
            {
              required: true,
              message: 'Please input the composition!',
            },
          ]}
        >
          <InputNumber
            style={{ width: '90%' }}
            autoComplete="disabled"
            precision={2}
            defaultValue={composition}
            min={0}
            onChange={(value) => setComposition(value)}
          />{' '}
          %
        </Form.Item>
        <Form.Item
          name="percent"
          label="Percentage"
          rules={[
            {
              required: true,
              message: 'Please input the percent!',
            },
          ]}
        >
          <InputNumber
            style={{ width: '90%' }}
            autoComplete="disabled"
            precision={2}
            min={0}
            defaultValue={percent}
            onChange={(value) => setPercentage(value)}
          />{' '}
          %
        </Form.Item>
        <Form.Item
          name="hsnCode"
          label="HSN Code"
          rules={[
            {
              required: true,
              message: 'Please input the HSN Code!',
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
