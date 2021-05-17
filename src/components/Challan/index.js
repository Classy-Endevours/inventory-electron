import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Pdf from 'react-to-pdf';
import { Form, Input } from 'antd';

const Challan = () => {
  const ref = React.createRef();
  const [form] = Form.useForm();

  return (
    <div>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => (
          <>
            <button type="button" onClick={toPdf}>
              Generate Pdf
            </button>
            <br />
          </>
        )}
      </Pdf>
      <div ref={ref}>
        <h1>Recorded Words</h1>
        <h2>here are some tet</h2>
        <Form form={form} layout="vertical" name="form_in_modal">
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
      </div>
    </div>
  );
};

export default Challan;
