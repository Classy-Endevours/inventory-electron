/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, InputNumber } from 'antd';
import { CustomModal } from '../../uielements/Modal.style';
import {
  NewContentButton,
  AntiContentButton,
  ColoredRow,
} from '../../uielements/Collection.style';
import { getItems } from '../../../components/Item/reducer';
import { getVendor } from '../../../components/Vendors/reducer';

const { Option } = Select;

export function AddInventoryOutForm({
  title,
  isOpen,
  onOk,
  onCancel,
  loading,
  initialValues = {},
  setCurrentObject,
  mode,
}) {
  const [itemAvailableQuantity, setItemAvailableQuantity] = useState(0);
  const { isLoading, items } = useSelector((state) => state.ItemsReducer);
  const { isLoading: isVendorLoading, vendor } = useSelector(
    (state) => state.VendorReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
    dispatch(getVendor());
    if (mode === 'edit') {
      setItemAvailableQuantity(initialValues.item.availableQuantity);
    }
  }, []);
  const handleOnchange = (value) => {
    setItemAvailableQuantity(value.split(' ')[1]);
  };
  const [form] = Form.useForm();
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        onOk({
          ...initialValues,
          ...values,
          itemId: values.itemId.split(' ')[0],
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
  const availableQuantityValidation = (rule, value, callback) => {
    if (value > itemAvailableQuantity) {
      callback(`Item quantiy should not more than ${itemAvailableQuantity}!`);
    } else {
      callback();
    }
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
            onChange={handleOnchange}
          >
            {items.map((item) => (
              <Option
                key={item.id}
                value={`${item.id} ${item.availableQuantity}`}
              >
                {item.productName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="vendorId"
          label="Select a vendor"
          rules={[
            {
              required: true,
              message: 'Please select a vendor!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={isVendorLoading}
          >
            {vendor.map((item) => (
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
          className="form-100"
          label={
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div>Quantity</div>
              <ColoredRow>
                Available quantity: {itemAvailableQuantity}
              </ColoredRow>
            </div>
          }
          rules={[
            {
              required: true,
              message: 'Please input the quantity!',
            },
            {
              validator: availableQuantityValidation,
            },
            // {
            //   max: parseFloat(itemAvailableQuantity),
            //   message: `Item quantiy should not more than ${itemAvailableQuantity}!`,
            // },
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
