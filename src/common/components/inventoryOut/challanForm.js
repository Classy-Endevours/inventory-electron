/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';
// eslint-disable-next-line import/no-unresolved
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
} from '../../uielements/Collection.style';

export function ChallanForm({
  title,
  isOpen,
  onOk,
  onCancel,
  loading,
  initialValues = {},
  setCurrentObject,
}) {
  const [form] = Form.useForm();
  const ref = useRef();
  const [quantity, setQuantity] = useState(initialValues.quantity || 0);
  const [rate, setRate] = useState(initialValues.rate || 0);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const { defaultSettings } = useSelector((state) => state.BasicSettingReducer);
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        handlePrint();
        onOk({
          ...initialValues,
          ...values,
          ...{ settingsId: defaultSettings.id },
        });
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
          onClick={() => {
            validate();
          }}
        >
          Print
        </AntiContentButton>,
      ]}
    >
      <div ref={ref}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={initialValues}
        >
          <Form.Item>
            <Title level={2}>{defaultSettings.name}</Title>
            <Title level={5}>Mobile: {defaultSettings.mobile1}</Title>
            <Title level={5}>Address: {defaultSettings.address}</Title>
            <Title level={5}>GST No.: {defaultSettings.gstNo}</Title>
          </Form.Item>
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
            name="name"
            label="Vendor Name"
            rules={[
              {
                required: true,
                message: 'Please input the vendor name!',
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="truckNo"
            label="Truck/Tempo No."
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
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: 'Please input the quantity!',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              autoComplete="disabled"
              precision={2}
              min={0}
              disabled
              defaultValue={quantity}
              onChange={(value) => setQuantity(value)}
            />
          </Form.Item>
          <Form.Item
            name="rate"
            label="Each count rate"
            rules={[
              {
                required: true,
                message: 'Please input the rate per item!',
              },
            ]}
          >
            <InputNumber
              style={{ width: '90%' }}
              autoComplete="disabled"
              precision={2}
              min={0}
              defaultValue={rate}
              disabled
              onChange={(value) => setRate(value)}
            />{' '}
            ₹
          </Form.Item>
          <Form.Item name="totalQuantity" label="Total quantity">
            <InputNumber
              style={{ width: '90%' }}
              disabled
              autoComplete="disabled"
              precision={2}
              min={0}
              defaultValue={quantity * rate}
            />{' '}
            ₹
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
}
export default {};
