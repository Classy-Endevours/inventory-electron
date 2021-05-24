/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, InputNumber } from 'antd';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
} from '../../uielements/Collection.style';
import { getItems } from '../../../components/Item/reducer';
import { getSupplier } from '../../../components/Supplier/reducer';

const { Option } = Select;

export function AddInventoryInForm({
  title,
  isOpen,
  onOk,
  onCancel,
  loading,
  initialValues = {},
  setCurrentObject,
}) {
  const { isLoading, items } = useSelector((state) => state.ItemsReducer);
  const { isLoading: isSupplierLoading, supplier } = useSelector(
    (state) => state.SupplierReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
    dispatch(getSupplier());
  }, []);
  const [form] = Form.useForm();
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        console.log({ values });
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
          name="itemId"
          label="Select a Item"
          rules={[
            {
              required: true,
              message: 'Please select a item!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={isLoading}
          >
            {items.map((item) => (
              <Option value={item.id}>{item.productName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="supplierId"
          label="Select a supplier"
          rules={[
            {
              required: true,
              message: 'Please select a supplier!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={isSupplierLoading}
          >
            {supplier.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="rate"
          label="Rate"
          rules={[
            {
              required: true,
              message: 'Please input the rate!',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            type="number"
            autoComplete="disabled"
            precision={2}
          />
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
            type="number"
            autoComplete="disabled"
            precision={2}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  );
}
export default {};
